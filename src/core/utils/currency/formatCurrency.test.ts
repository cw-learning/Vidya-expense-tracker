import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats Indian Rupees with rupee symbol and two decimal places', () => {
    expect(formatCurrency(100, 'INR')).toBe('₹100.00');
  });

  it('formats US Dollars with dollar symbol and two decimal places', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100.00');
  });

  it('formats Euros with euro symbol and two decimal places', () => {
    expect(formatCurrency(100, 'EUR')).toBe('€100.00');
  });

  it('falls back to INR formatting when an unrecognized currency code is provided', () => {
    expect(formatCurrency(100, 'ABC')).toBe('₹100.00');
  });
});
