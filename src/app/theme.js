import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const themeColors = {
  main: {
    primary: '#ffd54f',
    secondary: '#ef6c00',
    success: '#43a047',
    error: '#e53935'
  }
};

const { primary, secondary, success, error } = themeColors.main;

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      },
      success: {
        main: success
      },
      error: {
        main: error
      },
      contrastThreshold: 3,
      tonalOffset: 0.3
    }
  })
);

export default theme;
