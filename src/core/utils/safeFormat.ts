export function safeFormat(value: unknown, fallback = ''): string {
  return value != null ? String(value) : fallback;
}
