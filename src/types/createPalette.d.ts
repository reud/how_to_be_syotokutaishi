import * as createPalette from '@material-ui/core/styles/createPalette';
declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    daitoku?: PaletteColorOptions;
    syotoku?: PaletteColorOptions;
    daizin?: PaletteColorOptions;
    syozin?: PalPaletteColorOptionsetteColor;
    dairei?: PaletteColorOptions;
    syorei?: PaletteColorOptions;
    daishin?: PaletteColorOptions;
    syoshin?: PaletteColorOptions;
    daigi?: PaletteColorOptions;
    syogi?: PalePaletteColorOptionstteColor;
    daichi?: PaletteColorOptions;
    syochi?: PaletteColorOptions;
    primaryGradation?: GradationPaletteColorOptions;
  }

  interface Palette {
    daitoku?: PaletteColor;
    syotoku?: PaletteColor;
    daizin?: PaletteColor;
    syozin?: PaletteColor;
    dairei?: PaletteColor;
    syorei?: PaletteColor;
    daishin?: PaletteColor;
    syoshin?: PaletteColor;
    daigi?: PaletteColor;
    syogi?: PaletteColor;
    daichi?: PaletteColor;
    syochi?: PaletteColor;
  }

  interface GradationPaletteColorOptions {
    toRight?: string;
    toBottom?: string;
    toRightBottom?: string;
  }
  interface GradationPaletteColor {
    toRight: string;
    toBottom: string;
    toRightBottom?: string;
  }
}
