import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#4f5b62',
        main: '#263238',
        dark: '#000a12',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ff6434',
        main: '#dd2c00',
        dark: '#a30000',
        contrastText: '#ffffff',
      },
    },
  });

export default theme;