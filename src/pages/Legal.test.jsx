import { screen } from '@testing-library/react'
import { renderAt } from '../test-utils'

const mentionsData = () => {
  const text = document.body.textContent.toLowerCase()
  for (const word of ['ad soyad', 'e-posta', 'telefon', 'adet', 'webhook']) {
    expect(text).toContain(word)
  }
}

test('Gizlilik metni toplanan verileri ve webhook iletimini anar', () => {
  renderAt('/gizlilik')
  expect(screen.getByRole('heading', { level: 1, name: 'Gizlilik Politikası' })).toBeInTheDocument()
  mentionsData()
  expect(screen.getByText(/2026-10-29/)).toBeInTheDocument()
})

test('KVKK metni gerekli başlıkları içerir', () => {
  renderAt('/kvkk')
  expect(screen.getByRole('heading', { level: 1, name: 'KVKK Aydınlatma Metni' })).toBeInTheDocument()
  mentionsData()
  for (const name of [
    'Veri sorumlusu',
    'İşlenen kişisel veriler',
    'İşleme amacı',
    'Hukuki sebep',
    'Aktarım',
    'Haklarınız (KVKK md. 11)',
    'Başvuru',
  ]) {
    expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
  }
})
