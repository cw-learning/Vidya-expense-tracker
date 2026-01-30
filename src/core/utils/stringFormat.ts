export function stringFormat(str: string, ...args: unknown[]): string {
  return str.replace(/{(\d+)}/g, (match, num) => {
    const index = Number(num);
    return Number.isInteger(index) && index in args
      ? String(args[index])
      : match;
  });
}
