export interface FilterTabFooterProps {
  onSelect: (...args: unknown[]) => void;
  onCancel: () => void;
  selectText: string;
  cancelText: string;
}
