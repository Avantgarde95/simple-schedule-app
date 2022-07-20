/**
 * ex. formatNumber(35, 5) -> "00035".
 */
export function formatNumber(value: number, length: number) {
  return `${value}`.padStart(length, "0");
}

/**
 * YYYY-MM-DD format.
 * It is compatible to `value` of `<input type="date">`.
 */
export function formatDate(date: Date) {
  const yearString = formatNumber(date.getFullYear(), 4);
  const monthString = formatNumber(date.getMonth() + 1, 2);
  const dayString = formatNumber(date.getDate(), 2);

  return `${yearString}-${monthString}-${dayString}`;
}
