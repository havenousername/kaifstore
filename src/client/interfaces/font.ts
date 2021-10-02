export type Font = {
  fontFamily: string;
  fontStyle: string;
  fontDisplay: string;
  fontWeight: string;
  src: string;
  unicodeRange?: string;
};

export type AppFonts = {
  regular: Font;
  bold: Font;
  900: Font;
  light: Font;
};
