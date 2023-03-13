export function hasTypeProperty(
  obj: unknown,
  field: number | string | symbol,
): obj is { [f in typeof field]: unknown } {
  return (obj as { [f in typeof field]: unknown })[field] !== undefined;
}
