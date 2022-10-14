import React from 'react';
import { ThemeProvider } from '@mui/material';

import './App.css';
import LandingPage from './components/LandingPage';
import { theme } from './config/Theme'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage></LandingPage>
    </ThemeProvider>
  );
}

export default App;
