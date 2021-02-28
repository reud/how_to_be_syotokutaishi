import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      // 濃紫
      main: '#800080',
    },
    daitoku: {
      // 濃紫
      main: '#800080',
    },
    syotoku: {
      // 薄紫
      main: '#CC99FF',
    },
    daizin: {
      // 濃青
      main: '#333399',
    },
    syozin: {
      // 薄青
      main: '#3366FF',
    },
    dairei: {
      // 大礼
      main: '#FF0000',
    },
    syorei: {
      // 小礼
      main: '#FF6600',
    },
    daishin: {
      // 大信
      main: '#FFFF00',
    },
    syoshin: {
      // 小信
      main: '#FFFF99',
    },
    daigi: {
      // 大義
      main: '#FFFFFF',
    },
    syogi: {
      // 小義
      main: '#DDDDDD',
    },
    daichi: {
      // 大智
      main: '#000000',
    },
    syochi: {
      // 小智
      main: '#808080',
    },
    secondary: {
      main: '#d32f2f',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default theme;
