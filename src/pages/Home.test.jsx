import { screen, within } from '@testing-library/react'
import { renderAt } from '../test-utils'

test('beş bölüm görünür', () => {
  renderAt('/')
  expect(screen.getByRole('heading', { level: 1, name: 'Black Ember' })).toBeInTheDocument()
  for (const name of ['Hikâye', 'Örnek ürünler', 'Örnek işler', 'Malzemeler']) {
    expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
  }
})

test('açılışta bıçak fotoğrafı var', () => {
  renderAt('/')
  expect(screen.getByRole('img', { name: 'Koyu zeminde çapraz duran bir şef bıçağı' })).toHaveAttribute('src', '/media/hero-knife.webp')
})

test('hikâye dört adımı ve su vermeyi açıklar', () => {
  renderAt('/')
  const story = screen.getByRole('region', { name: 'Hikâye' })
  for (const step of ['Ocak', 'Örs', 'Su verme', 'Bileme']) {
    expect(within(story).getByText(step)).toBeInTheDocument()
  }
  expect(within(story).getByText(/suya ya da yağa daldırıp sertleştirmek/)).toBeInTheDocument()
})

test('3 öne çıkan ürün ve 3 örnek iş', () => {
  renderAt('/')
  const featured = screen.getByRole('region', { name: 'Örnek ürünler' })
  expect(within(featured).getAllByRole('article')).toHaveLength(3)
  expect(within(featured).getByRole('link', { name: 'Tüm katalog' })).toHaveAttribute('href', '/katalog')
  const works = screen.getByRole('region', { name: 'Örnek işler' })
  expect(within(works).getAllByRole('listitem')).toHaveLength(3)
})

test('malzemeler bölümü üç malzemeyi gösterir', () => {
  renderAt('/')
  const section = screen.getByRole('region', { name: 'Malzemeler' })
  for (const name of ['Çelik', 'Sap ahşabı', 'Kın derisi']) {
    expect(within(section).getByRole('heading', { name })).toBeInTheDocument()
  }
})

test('Kataloğa bak bağlantısı', () => {
  renderAt('/')
  expect(screen.getByRole('link', { name: 'Kataloğa bak' })).toHaveAttribute('href', '/katalog')
})
