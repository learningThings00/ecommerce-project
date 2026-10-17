export function formatCurrency(priceCents) {
  const price = Math.abs(priceCents) / 100;
  const sign = priceCents < 0 ? '-' : '';
  return `${sign}$${price.toFixed(2)}`;
}