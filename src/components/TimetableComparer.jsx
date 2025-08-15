import React, { useState } from 'react';
import { timetables } from '../data/timetables';
import { Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

// Helper to convert time string 'HH:MM' to minutes from midnight
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper to convert minutes back to 'HH:MM' format
const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
  const mins = (minutes % 60).toString().padStart(2, '0');
  return `${hours}:${mins}`;
};

const TimetableComparer = () => {
  const [selected, setSelected] = useState({ me: true, friend1: false, friend2: false });
  const [lunchSlots, setLunchSlots] = useState([]);

  const handleCheckboxChange = (event) => {
    setSelected({ ...selected, [event.target.name]: event.target.checked });
  };

  const findCommonLunchSlots = () => {
    const selectedSchedules = Object.keys(selected)
      .filter(key => selected[key])
      .map(key => timetables[key]);

    if (selectedSchedules.length < 2) {
      setLunchSlots([]);
      alert('비교할 친구를 1명 이상 선택해주세요.');
      return;
    }

    const days = ['월', '화', '수', '목', '금'];
    const commonLunchSlots = [];
    const dayStart = timeToMinutes('09:00');
    const dayEnd = timeToMinutes('18:00');
    const lunchStart = timeToMinutes('12:00');
    const lunchEnd = timeToMinutes('14:00');

    days.forEach(day => {
      const busyIntervals = selectedSchedules
        .flat()
        .filter(item => item.day === day)
        .map(item => ({ start: timeToMinutes(item.start), end: timeToMinutes(item.end) }))
        .sort((a, b) => a.start - b.start);

      const mergedBusy = busyIntervals.reduce((acc, current) => {
        if (acc.length === 0) return [current];
        const last = acc[acc.length - 1];
        if (current.start < last.end) last.end = Math.max(last.end, current.end);
        else acc.push(current);
        return acc;
      }, []);

      let lastBusyEnd = dayStart;
      mergedBusy.forEach(busy => {
        if (busy.start > lastBusyEnd) {
          const freeStart = lastBusyEnd;
          const freeEnd = busy.start;
          // Check for overlap with lunch time
          const overlapStart = Math.max(freeStart, lunchStart);
          const overlapEnd = Math.min(freeEnd, lunchEnd);
          if (overlapStart < overlapEnd) {
            commonLunchSlots.push({ day, start: minutesToTime(overlapStart), end: minutesToTime(overlapEnd) });
          }
        }
        lastBusyEnd = Math.max(lastBusyEnd, busy.end);
      });

      if (dayEnd > lastBusyEnd) {
        const finalFreeStart = lastBusyEnd;
        const overlapStart = Math.max(finalFreeStart, lunchStart);
        const overlapEnd = Math.min(dayEnd, lunchEnd);
        if (overlapStart < overlapEnd) {
          commonLunchSlots.push({ day, start: minutesToTime(overlapStart), end: minutesToTime(overlapEnd) });
        }
      }
    });

    setLunchSlots(commonLunchSlots);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>점심 밥약 시간 찾기</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        함께 점심 식사가 가능한 요일과 시간을 찾아드려요. (12:00 ~ 14:00)
      </Typography>
      <FormGroup row sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox checked={selected.me} disabled />} label="나" />
        <FormControlLabel control={<Checkbox checked={selected.friend1} onChange={handleCheckboxChange} name="friend1" />} label="친구 1" />
        <FormControlLabel control={<Checkbox checked={selected.friend2} onChange={handleCheckboxChange} name="friend2" />} label="친구 2" />
      </FormGroup>
      <Button variant="contained" onClick={findCommonLunchSlots} fullWidth>
        찾기!
      </Button>
      
      {lunchSlots.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>✅ 점심 약속 가능!</Typography>
          <List>
            {lunchSlots.map((slot, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={`${slot.day}요일 ${slot.start} ~ ${slot.end}`} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default TimetableComparer;
