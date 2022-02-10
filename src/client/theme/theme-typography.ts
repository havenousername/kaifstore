import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteOptions } from '@mui/material/styles/createPalette';

const typography = (pallete: PaletteOptions): TypographyOptions => ({
  allVariants: {
    letterSpacing: 'normal',
  },
  fontFamily: ['Coolvetica', 'sans-serif'].join(','),
  h1: {
    fontWeight: 'bold',
    fontSize: '2.5rem',
    lineHeight: 1.2,
    color: pallete.text.primary,
    letterSpacing: '0.2rem',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: '2.25rem',
    lineHeight: 1.3,
    color: pallete.text.primary,
  },
  h3: {
    fontWeight: 'normal',
    fontSize: '1.875rem',
    lineHeight: 1.5,
    color: pallete.text.primary,
  },
  h4: {
    fontWeight: 'bolder',
    fontSize: '1.5rem',
    lineHeight: 1.5,
  },
  h5: {
    fontWeight: 'normal',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  h6: {
    fontWeight: 'bold',
    fontSize: '0.874rem',
    lineHeight: 1.5,
  },
  subtitle1: {
    fontWeight: 'normal',
    fontSize: '0.5rem',
    lineHeight: 1.5,
  },
  caption: {
    color: pallete.text.primary,
  },
});

export default typography;
