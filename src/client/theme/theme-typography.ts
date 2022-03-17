import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteOptions } from '@mui/material/styles/createPalette';

const typography = (pallete: PaletteOptions): TypographyOptions => ({
  allVariants: {
    letterSpacing: 'normal',
  },
  fontFamily: ['Coolvetica', 'sans-serif'].join(','),
  h1: {
    fontWeight: 700,
    fontSize: '4.2rem',
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
    fontWeight: '900',
    fontSize: '1.5rem',
    letterSpacing: '1.4px',
    lineHeight: 1.5,
  },
  h5: {
    fontWeight: '800',
    fontSize: '1.2rem',
    letterSpacing: '1.4px',
    lineHeight: 1.5,
  },
  h6: {
    fontWeight: 'bold',
    fontSize: '0.874rem',
    lineHeight: 1.5,
  },
  subtitle1: {
    fontWeight: 'normal',
    fontSize: '1.1em',
    lineHeight: 1.5,
    color: `${pallete.grey[200]} !important`,
  },
  subtitle2: {
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  caption: {
    color: pallete.text.primary,
    fontSize: '0.9rem',
    fontWeight: 600,
  },
});

export default typography;
