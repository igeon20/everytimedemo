import { createTheme } from '@mui/material/styles';

// Everytime color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#C62917', // Everytime Red
    },
    secondary: {
      main: '#A6A6A6', // Gray for secondary text
    },
    background: {
      default: '#F8F8F8', // Light gray background
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h5: {
      fontWeight: 700,
      fontSize: '1.2rem',
    },
    body1: {
      fontSize: '0.9rem',
    },
    body2: {
      fontSize: '0.8rem',
    },
    caption: {
      fontSize: '0.7rem',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#333333',
          boxShadow: '0 1px 0 0 rgba(0,0,0,.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;
