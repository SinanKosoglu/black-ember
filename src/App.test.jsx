import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAt } from './test-utils'

test('menüden kataloğa gidilir', async () => {
  const user = userEvent.setup()
  renderAt('/')
  await user.click(screen.getByRole('link', { name: 'Katalog' }))
  expect(screen.getByRole('heading', { level: 1, name: 'Katalog' })).toBeInTheDocument()
})

test('her rota kendi başlığını gösterir', () => {
  renderAt('/gizlilik')
  expect(screen.getByRole('heading', { level: 1, name: 'Gizlilik Politikası' })).toBeInTheDocument()
})

test('KVKK rotası kendi başlığını gösterir', () => {
  renderAt('/kvkk')
  expect(screen.getByRole('heading', { level: 1, name: 'KVKK Aydınlatma Metni' })).toBeInTheDocument()
})

test('bilinmeyen adres ana sayfaya yönlenir', () => {
  renderAt('/xyz')
  expect(screen.getByRole('heading', { level: 1, name: 'Black Ember' })).toBeInTheDocument()
})

test('alt bilgide 18 yaş notu ve yasal bağlantılar var', () => {
  renderAt('/')
  expect(screen.getByText('Sipariş 18 yaş ve üzeri içindir.')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Gizlilik' })).toHaveAttribute('href', '/gizlilik')
  expect(screen.getByRole('link', { name: 'KVKK' })).toHaveAttribute('href', '/kvkk')
})

test('alt bilgide fotoğrafların temsili olduğu yazar', () => {
  renderAt('/')
  expect(screen.getByText('Fotoğraflar temsilidir.')).toBeInTheDocument()
})

test('menüde Hikâye ve Örnek işler ana sayfadaki bölümlere gider', () => {
  renderAt('/katalog')
  const menu = screen.getByRole('navigation', { name: 'Ana menü' })
  expect(within(menu).getByRole('link', { name: 'Hikâye' })).toHaveAttribute('href', '/#hikaye')
  expect(within(menu).getByRole('link', { name: 'Örnek işler' })).toHaveAttribute('href', '/#isler')
})

test('Katalog düğmesi katalogdayken etkin görünür', () => {
  renderAt('/katalog')
  expect(screen.getByRole('link', { name: 'Katalog' })).toHaveClass('pill-link', 'active')
})
