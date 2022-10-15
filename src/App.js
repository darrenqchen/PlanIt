import React from 'react';
import { ThemeProvider } from '@mui/material';

import './styles/App.css';
import LandingPage from './components/LandingPage';
import PlanPage from './components/PlanPage';
import { theme } from './config/Theme';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/plan" element={<PlanPage />} exact />
          <Route element={Error} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
