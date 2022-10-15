import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import PlanitLogoFilled from './PlanitLogoFilled';
import WoosMap from './WoosMap';
import InputPaper from './InputPaper';

const PlanPage = () => {
  useEffect(() => {
    console.log('rendered');
  });

  return (
    <Stack minHeight={'100vh'}>
      <InputPaper />
      <WoosMap />
    </Stack>
  );
};

export default PlanPage;
