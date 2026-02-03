/**
 * Formats a string using template replacement.
 * Replaces {0}, {1}, etc. with corresponding arguments.
 *
 * @param str - Template string with placeholders
 * @param args - Values to replace placeholders with
 * @returns Formatted string
 */
export function stringFormat(str: string, ...args: unknown[]): string {
  return str.replace(/{(\d+)}/g, (match, num) => String(args[num] || match));
}
