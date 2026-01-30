import { safeFormat } from './safeFormat';

describe('safeFormat', () => {
  it('converts value to string', () => {
    expect(safeFormat(123)).toBe('123');
    expect(safeFormat(true)).toBe('true');
  });

  it('returns fallback for null', () => {
    expect(safeFormat(null, 'N/A')).toBe('N/A');
  });

  it('returns fallback for undefined', () => {
    expect(safeFormat(undefined, 'N/A')).toBe('N/A');
  });

  it('returns empty string as default fallback', () => {
    expect(safeFormat(null)).toBe('');
    expect(safeFormat(undefined)).toBe('');
  });

  it('handles empty strings correctly', () => {
    expect(safeFormat('')).toBe('');
  });

  it('handles objects', () => {
    expect(safeFormat({ key: 'value' })).toBe('[object Object]');
  });
});
