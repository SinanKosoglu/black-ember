import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NotifyForm from './NotifyForm'
import { notifyPayload } from '../lib/webhook'

const product = {
  id: 'test-knife',
  name: 'Test bıçağı',
  category: 'kitchen',
  price: 2400,
  stock: 0,
  materials: 'Karbon çeliği, ceviz sap',
  image: '/media/placeholder-kitchen.svg',
  featured: false,
}

const setup = send => {
  const user = userEvent.setup()
  render(<NotifyForm product={product} send={send} />)
  return user
}

test('telefon ve adet alanı yoktur', () => {
  setup(vi.fn())
  expect(screen.queryByLabelText('Telefon')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('Adet')).not.toBeInTheDocument()
})

test('KVKK bağlantısı yeni sekmede açılır', () => {
  setup(vi.fn())
  const link = screen.getByRole('link', { name: 'KVKK Aydınlatma Metni' })
  expect(link).toHaveAttribute('href', '/kvkk')
  expect(link).toHaveAttribute('target', '_blank')
})

test('onay işaretlenmeden gönderilmez', async () => {
  const send = vi.fn()
  const user = setup(send)
  await user.type(screen.getByLabelText('Ad soyad'), 'Test Kullanıcı')
  await user.type(screen.getByLabelText('E-posta'), 'test@ornek.com')
  await user.click(screen.getByRole('button', { name: 'Gönder' }))
  expect(send).not.toHaveBeenCalled()
  expect(screen.getByText('KVKK metnini onaylayın.')).toBeInTheDocument()
})

test("geçerli girişte webhook'a doğru veri gider", async () => {
  const send = vi.fn().mockResolvedValue()
  const user = setup(send)
  await user.type(screen.getByLabelText('Ad soyad'), 'Test Kullanıcı')
  await user.type(screen.getByLabelText('E-posta'), 'test@ornek.com')
  await user.click(screen.getByLabelText(/KVKK Aydınlatma Metni/))
  await user.click(screen.getByRole('button', { name: 'Gönder' }))
  expect(send).toHaveBeenCalledTimes(1)
  expect(send).toHaveBeenCalledWith(
    notifyPayload({ product, name: 'Test Kullanıcı', email: 'test@ornek.com' }),
  )
  expect(await screen.findByText(/Teşekkürler! Ürün gelince size haber vereceğiz/)).toBeInTheDocument()
})
