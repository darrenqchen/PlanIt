import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography, Grid } from '@mui/material';
import PlanitLogoFilled from './PlanitLogoFilled';

export default function InputPaper() {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={3}
        paddingTop={2}
        paddingLeft={2}
        paddingBottom={2}
        sx={{ height: '100%' }}
      >
        <Paper elevation={3} sx={{ height: '100%' }}>
          <Box paddingLeft={2}>
            <PlanitLogoFilled />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
