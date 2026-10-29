import { formatPrice } from './format'

test('fiyatı Türkçe biçimde TL ile yazar', () => {
  expect(formatPrice(2400)).toBe('2.400 TL')
  expect(formatPrice(950)).toBe('950 TL')
})
