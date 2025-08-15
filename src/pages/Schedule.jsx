import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Timetable from '../components/Timetable';
import TimetableComparer from '../components/TimetableComparer';
import { timetables } from '../data/timetables';

const Schedule = () => {
  const userSchedule = timetables.me;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 2 }}>
        <Timetable schedule={userSchedule} title="2025년 2학기" />
        <TimetableComparer />
      </Box>
    </Container>
  );
};

export default Schedule;
