import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { products } from '../data/products'
import { renderAt } from '../test-utils'

const featured = products.filter(p => p.featured)

test('bütün bölümler görünür', () => {
  renderAt('/')
  expect(screen.getByRole('heading', { level: 1, name: 'Black Ember' })).toBeInTheDocument()
  for (const name of ['Hikâye', 'Örnek ürünler', 'Örnek işler', 'Malzemeler', 'Sipariş ya da soru için']) {
    expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
  }
})

test('açılışta bıçak fotoğrafı ve kataloğa bağlantı var', () => {
  renderAt('/')
  expect(screen.getByRole('img', { name: 'Koyu zeminde çapraz duran bir şef bıçağı' })).toHaveAttribute(
    'src',
    '/media/hero-knife.webp',
  )
  expect(screen.getByRole('link', { name: 'Kataloğa bak' })).toHaveAttribute('href', '/katalog')
})

test('her öne çıkan ürünün kendi sahnesi var', () => {
  renderAt('/')
  const section = screen.getByRole('region', { name: 'Örnek ürünler' })
  const scenes = within(section).getAllByRole('region')
  expect(scenes).toHaveLength(3)
  featured.forEach((product, i) => {
    const scene = scenes[i]
    expect(scene).toHaveAccessibleName(product.name)
    expect(within(scene).getByRole('img', { name: product.name })).toHaveAttribute('src', product.image)
    expect(within(scene).getByText(product.description)).toBeInTheDocument()
  })
  expect(within(section).getByRole('link', { name: 'Tüm katalog' })).toHaveAttribute('href', '/katalog')
})

test('sahnedeki Sipariş ver düğmesi o ürünün penceresini açar', async () => {
  const user = userEvent.setup()
  renderAt('/')
  const product = featured.find(p => p.stock > 0)
  const scene = screen.getByRole('region', { name: product.name })
  await user.click(within(scene).getByRole('button', { name: 'Sipariş ver' }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByRole('heading', { name: product.name })).toBeInTheDocument()
})

test('dövme bannerı görünür', () => {
  renderAt('/')
  const banner = screen.getByRole('region', { name: 'Dövme' })
  expect(within(banner).getByText(/tek tek dövülür/)).toBeInTheDocument()
})

test('hikâye dört adımı ve su vermeyi açıklar', () => {
  renderAt('/')
  const story = screen.getByRole('region', { name: 'Hikâye' })
  for (const step of ['Ocak', 'Örs', 'Su verme', 'Bileme']) {
    expect(within(story).getByRole('heading', { name: step })).toBeInTheDocument()
  }
  expect(within(story).getByText(/suya ya da yağa daldırıp sertleştirmek/)).toBeInTheDocument()
})

test('3 örnek iş ve 3 malzeme fotoğraflarıyla', () => {
  renderAt('/')
  const works = screen.getByRole('region', { name: 'Örnek işler' })
  expect(within(works).getAllByRole('listitem')).toHaveLength(3)
  expect(within(works).getAllByRole('img')).toHaveLength(3)
  const section = screen.getByRole('region', { name: 'Malzemeler' })
  for (const name of ['Çelik', 'Sap ahşabı', 'Kın derisi']) {
    expect(within(section).getByRole('heading', { name })).toBeInTheDocument()
    expect(within(section).getByRole('img', { name })).toBeInTheDocument()
  }
})

test('kapanış bölümü kataloğa götürür', () => {
  renderAt('/')
  const closing = screen.getByRole('region', { name: 'Sipariş ya da soru için' })
  expect(within(closing).getByRole('link', { name: 'Kataloğa git' })).toHaveAttribute('href', '/katalog')
})
