import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'

const renderCard = props => render(<ProductCard {...props} />, { wrapper: MemoryRouter })

const product = {
  id: 'test-knife',
  slug: 'test-bicagi',
  name: 'Test bıçağı',
  category: 'kitchen',
  price: 2400,
  stock: 2,
  materials: 'Karbon çeliği, ceviz sap',
  image: '/media/category-kitchen.webp',
  featured: false,
}

test('stoktaki ürün fiyatı ve Sipariş ver düğmesini gösterir', async () => {
  const user = userEvent.setup()
  const onOrder = vi.fn()
  renderCard({ product, onOrder, onNotify: vi.fn() })
  expect(screen.getByRole('heading', { name: 'Test bıçağı' })).toBeInTheDocument()
  expect(screen.getByText('2.400 TL')).toBeInTheDocument()
  expect(screen.getByText('Stokta: 2')).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Test bıçağı' })).toHaveAttribute('src', product.image)
  await user.click(screen.getByRole('button', { name: 'Sipariş ver' }))
  expect(onOrder).toHaveBeenCalledWith(product)
})

test('tükenen ürün Gelince haber ver gösterir', async () => {
  const user = userEvent.setup()
  const onNotify = vi.fn()
  const soldOut = { ...product, stock: 0 }
  renderCard({ product: soldOut, onOrder: vi.fn(), onNotify })
  expect(screen.getByText('Tükendi')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Sipariş ver' })).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Gelince haber ver' }))
  expect(onNotify).toHaveBeenCalledWith(soldOut)
})

test('ürün adı detay sayfasına bağlanır', () => {
  renderCard({ product, onOrder: vi.fn(), onNotify: vi.fn() })
  expect(screen.getByRole('link', { name: 'Test bıçağı' })).toHaveAttribute('href', '/katalog/test-bicagi')
})
