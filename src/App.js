import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <div
      style={{
        backgroundImage: 'url(/under-construction.png)',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Stack>
        <Typography>planit</Typography>
      </Stack>
    </div>
  );
}

export default App;
