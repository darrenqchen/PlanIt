import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import PlanitLogoFilled from './PlanitLogoFilled';
import WoosMap from './WoosMap';

const PlanPage = () => {
  useEffect(() => {
    console.log('rendered');
  });

  return (
    <Stack>
      <Typography color="primary">
        This is the page meant for planning
      </Typography>
      <WoosMap />
    </Stack>
  );
};

export default PlanPage;
