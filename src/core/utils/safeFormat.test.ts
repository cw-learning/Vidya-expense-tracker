import { safeFormat } from './safeFormat';

describe('safeFormat', () => {
  it('converts non-null values to their string representation', () => {
    expect(safeFormat(123)).toBe('123');
    expect(safeFormat(true)).toBe('true');
  });

  it('returns the specified fallback value when input is null', () => {
    expect(safeFormat(null, 'N/A')).toBe('N/A');
  });

  it('returns the specified fallback value when input is undefined', () => {
    expect(safeFormat(undefined, 'N/A')).toBe('N/A');
  });

  it('returns an empty string when no fallback is provided for null or undefined values', () => {
    expect(safeFormat(null)).toBe('');
    expect(safeFormat(undefined)).toBe('');
  });

  it('preserves empty strings as-is without applying fallback behavior', () => {
    expect(safeFormat('')).toBe('');
  });

  it('converts objects to their default string representation', () => {
    expect(safeFormat({ key: 'value' })).toBe('[object Object]');
  });
});
