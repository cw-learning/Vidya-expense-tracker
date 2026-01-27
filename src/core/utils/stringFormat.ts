export function stringFormat(str: string, ...args: unknown[]): string {
  return str.replace(/{(\d+)}/g, (match, num) => String(args[num] || match));
}
