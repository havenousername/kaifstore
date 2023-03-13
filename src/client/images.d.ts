// src/types/images.d.ts
declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  const ReactComponent: any;
  export { ReactComponent };
  export default content;
}
