import { numberFormat } from './numberFormat';

describe('numberFormat', () => {
  it('formats with default 2 decimals', () => {
    expect(numberFormat(123.456)).toBe('123.46');
  });

  it('formats with custom decimals', () => {
    expect(numberFormat(123.456, 1)).toBe('123.5');
    expect(numberFormat(123.456, 3)).toBe('123.456');
  });

  it('formats integers', () => {
    expect(numberFormat(100)).toBe('100.00');
    expect(numberFormat(100, 0)).toBe('100');
  });

  it('handles negative numbers', () => {
    expect(numberFormat(-50.5)).toBe('-50.50');
  });

  it('handles zero', () => {
    expect(numberFormat(0)).toBe('0.00');
    expect(numberFormat(0, 0)).toBe('0');
  });

  it('rounds correctly', () => {
    expect(numberFormat(1.006, 2)).toBe('1.01');
    expect(numberFormat(1.004, 2)).toBe('1.00');
  });
});
