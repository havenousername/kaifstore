const isString = (fn: any): fn is string => typeof fn === 'string';
const isUndefined = (fn: any): fn is undefined => typeof fn === 'undefined';
const isNil = (fn: any): fn is null | undefined =>
  fn === null || isUndefined(fn);
// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (fn: any): fn is object =>
  !isNil(fn) || typeof fn === 'object';

const isBlobOrStringArray = (fn: any[]): fn is Array<string | Blob> => {
  return fn.every(
    (i) => isString(i) || ((i.text && i.type && i.arrayBuffer) as Blob),
  );
};

type NonFalsyPrimitive = number | string | bigint | boolean | symbol;

const isPrimitive = (fn: any): fn is NonFalsyPrimitive =>
  typeof fn === 'string' ||
  typeof fn === 'number' ||
  typeof fn === 'boolean' ||
  typeof fn === 'bigint' ||
  typeof fn === 'symbol';

export {
  isNil,
  isObject,
  isString,
  isUndefined,
  isBlobOrStringArray,
  isPrimitive,
};
