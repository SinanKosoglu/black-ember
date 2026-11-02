import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { products } from '../data/products'
import { renderAt } from '../test-utils'

test('başta tüm ürünler listelenir', () => {
  renderAt('/katalog')
  expect(screen.getAllByRole('article')).toHaveLength(products.length)
  expect(screen.getByRole('button', { name: 'Tümü' })).toHaveAttribute('aria-pressed', 'true')
})

test('süzgeç yalnızca seçili kategoriyi gösterir', async () => {
  const user = userEvent.setup()
  renderAt('/katalog')
  await user.click(screen.getByRole('button', { name: 'Çakı' }))
  const folding = products.filter(p => p.category === 'folding')
  expect(screen.getAllByRole('article')).toHaveLength(folding.length)
  expect(screen.getByRole('heading', { name: folding[0].name })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Çakı' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Tümü' })).toHaveAttribute('aria-pressed', 'false')
})

const cardOf = product =>
  screen.getByRole('heading', { level: 3, name: product.name }).closest('article')

test('Sipariş ver penceresi açar, Escape kapatır', async () => {
  const user = userEvent.setup()
  renderAt('/katalog')
  const inStock = products.find(p => p.stock > 0)
  await user.click(within(cardOf(inStock)).getByRole('button', { name: 'Sipariş ver' }))
  const dialog = screen.getByRole('dialog')
  expect(dialog).toHaveAttribute('aria-modal', 'true')
  expect(within(dialog).getByRole('heading', { name: inStock.name })).toBeInTheDocument()
  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('başka ürün açılınca form sıfırlanır', async () => {
  const user = userEvent.setup()
  renderAt('/katalog')
  const [a, b] = products.filter(p => p.stock > 0)
  await user.click(within(cardOf(a)).getByRole('button', { name: 'Sipariş ver' }))
  await user.type(screen.getByLabelText('Ad soyad'), 'Test Kullanıcı')
  await user.click(screen.getByRole('button', { name: 'Kapat' }))
  await user.click(within(cardOf(b)).getByRole('button', { name: 'Sipariş ver' }))
  expect(within(screen.getByRole('dialog')).getByRole('heading', { name: b.name })).toBeInTheDocument()
  expect(screen.getByLabelText('Ad soyad')).toHaveValue('')
})

test('tükenen üründe Gelince haber ver bildirim formunu açar', async () => {
  const user = userEvent.setup()
  renderAt('/katalog')
  const soldOut = products.find(p => p.stock === 0)
  await user.click(within(cardOf(soldOut)).getByRole('button', { name: 'Gelince haber ver' }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByLabelText('E-posta')).toBeInTheDocument()
  expect(within(dialog).queryByLabelText('Telefon')).not.toBeInTheDocument()
})

test('sayaç süzgece göre ürün sayısını gösterir', async () => {
  const user = userEvent.setup()
  renderAt('/katalog')
  expect(screen.getByText(`${products.length} ürün`)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Bakım' }))
  const care = products.filter(p => p.category === 'care')
  expect(screen.getByText(`${care.length} ürün`)).toBeInTheDocument()
})

test('kartta kategori etiketi görünür', () => {
  renderAt('/katalog')
  const product = products.find(p => p.category === 'outdoor')
  expect(within(cardOf(product)).getByText('Kamp ve av')).toBeInTheDocument()
})
