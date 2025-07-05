export function calculateTotal(amounts: string): number {
  if (!amounts) return 0;

  // Split the string by commas or newlines, trim spaces, and filter out empty values
  const amountsArray = amounts
    .split(/[,\n]/)
    .map((value) => value.trim())
    .filter((value) => value !== "");

  // Convert to numbers and calculate the total
  const total = amountsArray.reduce((sum, value) => {
    const num = parseFloat(value);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return total;
}