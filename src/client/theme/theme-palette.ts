import {
  PaletteColorOptions,
  PaletteOptions,
  TypeBackground,
  TypeText,
} from '@mui/material/styles/createPalette';
import { Color } from '@mui/material';
import kaifstoreColors from './kaifstore-colors';

const background: Partial<TypeBackground> = {
  default: kaifstoreColors.blackGrayBackground,
  paper: kaifstoreColors.violetDarkOpaque,
};

const primary: PaletteColorOptions = {
  light: kaifstoreColors.violetLight,
  main: kaifstoreColors.violetDark,
  dark: kaifstoreColors.violetDark,
  contrastText: kaifstoreColors.white,
};

const secondary: PaletteColorOptions = {
  light: kaifstoreColors.grayBackground,
  main: kaifstoreColors.white,
  dark: kaifstoreColors.white,
};

const text: Partial<TypeText> = {
  primary: kaifstoreColors.white,
  secondary: kaifstoreColors.grayText,
};

const grey: Partial<Color> = {
  50: kaifstoreColors.whiteAlmost,
  100: kaifstoreColors.whiteTransparent,
  200: kaifstoreColors.whiteGray,
  300: kaifstoreColors.grayText,
  500: kaifstoreColors.gray,
  600: kaifstoreColors.blackAdmin,
  700: kaifstoreColors.grayBackground,
  800: kaifstoreColors.blackAlmost,
};

const success: PaletteColorOptions = {
  light: kaifstoreColors.greenDark,
  main: kaifstoreColors.greenDark,
  dark: kaifstoreColors.greenDark,
  contrastText: kaifstoreColors.black,
};

const error: PaletteColorOptions = {
  light: kaifstoreColors.roseLight,
  main: kaifstoreColors.roseDark,
};

const palette: PaletteOptions = {
  primary,
  background,
  grey,
  text,
  success,
  error,
  secondary,
};

export default palette;
