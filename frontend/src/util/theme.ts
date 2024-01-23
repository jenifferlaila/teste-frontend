import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000',
      contrastText: '#000000',
      light: '#f5f5f5',
      dark: '#dcdcdc',
    },
    secondary: {
      main: '#259c00',
      light: 'rgb(80, 175, 51)',
      dark: 'rgb(25, 109, 0)',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export default theme;
