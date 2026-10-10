export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const formatNumber = (n: number) => new Intl.NumberFormat("en-US").format(n);
