/**
 * Formats a number as currency with appropriate locale and currency symbol.
 *
 * @param amount - The amount to format
 * @param currency - The currency code (defaults to 'INR')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'INR',
): string {
  const symbols: Record<string, string> = { INR: '₹', USD: '$', EUR: '€' };
  return `${symbols[currency] || '₹'}${amount.toFixed(2)}`;
}
