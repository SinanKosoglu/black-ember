import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { products } from '../data/products'
import { materials } from '../data/showcase'
import { renderAt } from '../test-utils'

test.each(products.map(p => [p.slug, p]))('/katalog/%s ürünün sayfasını açar', (slug, product) => {
  renderAt(`/katalog/${slug}`)
  expect(screen.getByRole('heading', { level: 1, name: product.name })).toBeInTheDocument()
  expect(screen.getByText(product.description)).toBeInTheDocument()
  expect(screen.getByText(product.story)).toBeInTheDocument()
  expect(screen.getByText(product.care)).toBeInTheDocument()
  for (const spec of product.specs) {
    expect(screen.getByText(spec)).toBeInTheDocument()
  }
  expect(document.title).toBe(`${product.name} · Black Ember`)
})

test('malzeme bölümünde ürünün malzeme fotoğrafı var', () => {
  const product = products[0]
  const material = materials.find(m => m.id === product.material)
  renderAt(`/katalog/${product.slug}`)
  expect(screen.getByRole('img', { name: material.name })).toHaveAttribute('src', material.image)
})

test('stoktaki üründe alttaki düğme sipariş penceresini açar', async () => {
  const user = userEvent.setup()
  const product = products.find(p => p.stock > 0)
  renderAt(`/katalog/${product.slug}`)
  const bar = screen.getByRole('region', { name: 'Sipariş' })
  expect(within(bar).getByText(`Stokta: ${product.stock}`)).toBeInTheDocument()
  await user.click(within(bar).getByRole('button', { name: 'Sipariş ver' }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByRole('heading', { name: product.name })).toBeInTheDocument()
  expect(within(dialog).getByLabelText('Telefon')).toBeInTheDocument()
})

test('tükenen üründe alttaki düğme bildirim penceresini açar', async () => {
  const user = userEvent.setup()
  const product = products.find(p => p.stock === 0)
  renderAt(`/katalog/${product.slug}`)
  const bar = screen.getByRole('region', { name: 'Sipariş' })
  expect(within(bar).getByText('Tükendi')).toBeInTheDocument()
  expect(within(bar).queryByRole('button', { name: 'Sipariş ver' })).not.toBeInTheDocument()
  await user.click(within(bar).getByRole('button', { name: 'Gelince haber ver' }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByLabelText('E-posta')).toBeInTheDocument()
  expect(within(dialog).queryByLabelText('Telefon')).not.toBeInTheDocument()
})

test('Diğer bıçaklar 3 başka ürüne bağlanır', async () => {
  const user = userEvent.setup()
  const product = products[0]
  renderAt(`/katalog/${product.slug}`)
  const others = screen.getByRole('region', { name: 'Diğer bıçaklar' })
  const links = within(others)
    .getAllByRole('link')
    .filter(link => link.getAttribute('href').startsWith('/katalog/'))
  expect(links).toHaveLength(3)
  expect(links.map(l => l.getAttribute('href'))).not.toContain(`/katalog/${product.slug}`)
  const target = products.find(p => links[0].getAttribute('href') === `/katalog/${p.slug}`)
  await user.click(links[0])
  expect(screen.getByRole('heading', { level: 1, name: target.name })).toBeInTheDocument()
})

test('bilinmeyen ürün adresi kataloğa yönlenir', () => {
  renderAt('/katalog/yok-boyle-bicak')
  expect(screen.getByRole('heading', { level: 1, name: 'Katalog' })).toBeInTheDocument()
})
