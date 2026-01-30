export function formatCurrency(
  amount: number,
  currency: string = 'INR',
): string {
  const symbols: Record<string, string> = { INR: '₹', USD: '$', EUR: '€' };
  return `${symbols[currency] || '₹'}${amount.toFixed(2)}`;
}
