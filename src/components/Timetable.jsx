import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { academicCalendar } from '../data/academicCalendar';

const days = ['월', '화', '수', '목', '금'];
const timeSlots = Array.from({ length: 10 }, (_, i) => `${9 + i}:00`);

const Timetable = ({ schedule, title }) => {
  const cellHeight = 50;

  const getPosition = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return (hour - 9) * cellHeight + (minute / 60) * cellHeight;
  };

  const getHeight = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const durationMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    return (durationMinutes / 60) * cellHeight;
  };

  const holidaysMap = new Map(
    academicCalendar
      .filter(item => item.isHoliday)
      .map(item => [item.day, item.name])
  );

  return (
    <Paper elevation={0} sx={{ border: '1px solid #e5e5e5', mb: 4 }}>
      <Typography variant="h6" sx={{ p: 1.5, textAlign: 'center', borderBottom: '1px solid #e5e5e5' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <Box sx={{ width: 50 }}>
          {timeSlots.map(time => (
            <Box key={time} sx={{ height: cellHeight, textAlign: 'right', pr: 1, fontSize: '0.7rem', color: '#a6a6a6' }}>
              {time.split(':')[0]}
            </Box>
          ))}
        </Box>
        
        <Grid container sx={{ flex: 1, position: 'relative' }}>
          {days.map((day) => {
            const holidayName = holidaysMap.get(day);
            const isHoliday = !!holidayName;
            return (
              <Grid item xs sx={{ flex: 1, borderLeft: '1px solid #f2f2f2', background: isHoliday ? '#FFF0F5' : '#fff' }} key={day}>
                <Typography sx={{ textAlign: 'center', py: 1, color: isHoliday ? 'red' : 'inherit', fontWeight: 'bold' }}>
                  {day}
                </Typography>
                {isHoliday && (
                  <Typography sx={{ textAlign: 'center', fontSize: '0.7rem', color: 'red', fontWeight: 'bold', position: 'absolute', top: 40, width: `calc(${100 / days.length}%)` }}>
                    {holidayName}
                  </Typography>
                )}
                <Box sx={{ height: cellHeight * timeSlots.length, position: 'relative' }}>
                  {timeSlots.slice(1).map(time => (
                    <Box key={time} sx={{ position: 'absolute', top: getPosition(time), width: '100%', height: '1px', backgroundColor: '#f2f2f2' }} />
                  ))}
                </Box>
              </Grid>
            );
          })}
          
          <Box sx={{ position: 'absolute', top: 40, left: 0, right: 0, bottom: 0, p: '0 2px' }}>
            {schedule.map(item => (
              <Paper
                key={item.id}
                sx={{
                  position: 'absolute',
                  top: getPosition(item.start),
                  left: `${(days.indexOf(item.day) / days.length) * 100}%`,
                  width: `calc(${100 / days.length}% - 4px)`,
                  height: getHeight(item.start, item.end),
                  backgroundColor: item.color || '#C2EABD',
                  p: 0.5,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  boxShadow: 'none',
                }}
              >
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#fff' }}>{item.name}</Typography>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Timetable;
