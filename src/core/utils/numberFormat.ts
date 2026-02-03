/**
 * Formats a number to a fixed number of decimal places.
 *
 * @param num - The number to format
 * @param decimals - Number of decimal places (defaults to 2)
 * @returns Formatted number as string
 */
export function numberFormat(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}
