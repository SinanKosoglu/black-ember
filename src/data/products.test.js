import { CATEGORIES, categoryLabel, products } from './products'
import { materials, works } from './showcase'

const categoryIds = CATEGORIES.map(c => c.id)

test('yasak bıçak türü içermez', () => {
  for (const p of products) {
    expect(`${p.name} ${p.materials}`).not.toMatch(/sustal|kelebek/i)
  }
})

test('her ürün geçerli', () => {
  for (const p of products) {
    expect(categoryIds).toContain(p.category)
    expect(Number.isInteger(p.price) && p.price > 0).toBe(true)
    expect(Number.isInteger(p.stock) && p.stock >= 0).toBe(true)
    expect(p.image.startsWith('/media/')).toBe(true)
  }
})

test("id'ler benzersiz", () => {
  const ids = products.map(p => p.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test('tam 3 ürün öne çıkar', () => {
  expect(products.filter(p => p.featured)).toHaveLength(3)
})

test('8–10 ürün; her kategoride en az bir, en az bir tükenmiş', () => {
  expect(products.length).toBeGreaterThanOrEqual(8)
  expect(products.length).toBeLessThanOrEqual(10)
  for (const id of categoryIds) {
    expect(products.some(p => p.category === id)).toBe(true)
  }
  expect(products.some(p => p.stock === 0)).toBe(true)
})

test('kategori etiketleri Türkçe ve sıralı', () => {
  expect(CATEGORIES.map(c => c.label)).toEqual(['Mutfak', 'Kamp ve av', 'Çakı', 'Bakım'])
  expect(categoryLabel('folding')).toBe('Çakı')
})

test('3 örnek iş ve 3 malzeme', () => {
  expect(works).toHaveLength(3)
  expect(materials).toHaveLength(3)
})
