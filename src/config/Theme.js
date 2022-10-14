import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#0078cc',
        light: '#8ae0f4',
        dark: '#2e8799',
      },
      secondary: {
        main: '#009146',
      },
      background: {
        default: '#ffffff',
        paper: '#e2f7fd',
      },
      text: {
        primary: '#000000',
        secondary: '#ffffff',
      },
      error: {
        main: '#b14f36',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontWeightLight: 300,
    },
    overrides: {
      MuiButton: {
        root: {
          background: 'linear-gradient(45deg, #00c28d 30%, #3ccda2 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    shape: {
      borderRadius: 10,
    },
  });