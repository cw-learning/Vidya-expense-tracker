/**
 * Safely converts a value to a string with a fallback for null/undefined.
 * Uses strict equality checks to handle null and undefined separately.
 *
 * @param value - The value to convert to string
 * @param fallback - The fallback string to return if value is null/undefined (defaults to empty string)
 * @returns The stringified value or fallback
 */
export function safeFormat(value: unknown, fallback = ''): string {
  return value !== null && value !== undefined ? String(value) : fallback;
}
