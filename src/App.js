import React from 'react';
import { ThemeProvider } from '@mui/material';

import './App.css';
import LandingPage from './components/LandingPage';
import { theme } from './config/Theme';
import { Route, Routes } from 'react-router-dom';
import './amadeusAPI.js'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          {/* <Route path="/plan" component={PlanPage} /> */}
          <Route element={Error} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
