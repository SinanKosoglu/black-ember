import { render, screen } from '@testing-library/react'
import { renderAt } from '../test-utils'
import CatalogQr from './CatalogQr'

test('verilen adres için QR kodu ve adresi gösterir', () => {
  render(<CatalogQr url="https://ornek.test/katalog" />)
  const qr = screen.getByRole('img', { name: 'Katalog QR kodu' })
  expect(qr.tagName.toLowerCase()).toBe('svg')
  expect(screen.getByText('Kataloğu telefonda açmak için okutun.')).toBeInTheDocument()
  expect(screen.getByText('https://ornek.test/katalog')).toBeInTheDocument()
})

test('katalog sayfası kendi adresinin QR kodunu gösterir', () => {
  renderAt('/katalog')
  expect(screen.getByRole('img', { name: 'Katalog QR kodu' })).toBeInTheDocument()
  expect(screen.getByText(`${window.location.origin}/katalog`)).toBeInTheDocument()
})
