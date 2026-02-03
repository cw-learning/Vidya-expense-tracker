import { numberFormat } from './numberFormat';

describe('numberFormat', () => {
  it('formats numbers to 2 decimal places when no precision is specified', () => {
    expect(numberFormat(123.456)).toBe('123.46');
  });

  it('formats numbers to the specified number of decimal places', () => {
    expect(numberFormat(123.456, 1)).toBe('123.5');
    expect(numberFormat(123.456, 3)).toBe('123.456');
  });

  it('adds decimal places to integers based on precision parameter', () => {
    expect(numberFormat(100)).toBe('100.00');
    expect(numberFormat(100, 0)).toBe('100');
  });

  it('preserves the negative sign when formatting negative numbers', () => {
    expect(numberFormat(-50.5)).toBe('-50.50');
  });

  it('formats zero with the appropriate number of decimal places', () => {
    expect(numberFormat(0)).toBe('0.00');
    expect(numberFormat(0, 0)).toBe('0');
  });

  it('applies standard rounding rules (rounds up at .5 or above)', () => {
    expect(numberFormat(1.006, 2)).toBe('1.01');
    expect(numberFormat(1.004, 2)).toBe('1.00');
  });
});
