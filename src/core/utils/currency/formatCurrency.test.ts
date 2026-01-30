import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats INR', () => {
    expect(formatCurrency(100, 'INR')).toBe('₹100.00');
  });
  it('formats USD', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100.00');
  });

  it('formats EUR', () => {
    expect(formatCurrency(100, 'EUR')).toBe('€100.00');
  });

  it('defaults to INR for unknown currency', () => {
    expect(formatCurrency(100, 'ABC')).toBe('₹100.00');
  });
});
