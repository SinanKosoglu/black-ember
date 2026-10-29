const number = new Intl.NumberFormat('tr-TR')

export function formatPrice(n) {
  return `${number.format(n)} TL`
}
