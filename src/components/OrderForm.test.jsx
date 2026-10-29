import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import OrderForm from './OrderForm'
import { orderPayload } from '../lib/webhook'

const product = {
  id: 'test-knife',
  name: 'Test bıçağı',
  category: 'kitchen',
  price: 2400,
  stock: 2,
  materials: 'Karbon çeliği, ceviz sap',
  image: '/media/placeholder-kitchen.svg',
  featured: false,
}

const setup = send => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <OrderForm product={product} send={send} />
    </MemoryRouter>,
  )
  return user
}

const fill = async (user, { boxes = true } = {}) => {
  await user.type(screen.getByLabelText('Ad soyad'), 'Test Kullanıcı')
  await user.type(screen.getByLabelText('E-posta'), 'test@ornek.com')
  await user.type(screen.getByLabelText('Telefon'), '0500 000 00 00')
  if (boxes) {
    await user.click(screen.getByLabelText('18 yaşından büyüğüm'))
    await user.click(screen.getByLabelText(/KVKK Aydınlatma Metni/))
  }
}

test('yaş uyarısı ve KVKK bağlantısı formda görünür', () => {
  setup(vi.fn())
  expect(screen.getByText('Sipariş 18 yaş ve üzeri içindir.')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'KVKK Aydınlatma Metni' })).toHaveAttribute('href', '/kvkk')
})

test('onaylar işaretlenmeden gönderilmez', async () => {
  const send = vi.fn()
  const user = setup(send)
  await fill(user, { boxes: false })
  await user.click(screen.getByRole('button', { name: 'Gönder' }))
  expect(send).not.toHaveBeenCalled()
  expect(screen.getByText('Sipariş için 18 yaşından büyük olmalısınız.')).toBeInTheDocument()
  expect(screen.getByText('KVKK metnini onaylayın.')).toBeInTheDocument()
})

test('stoğu aşan adet reddedilir', async () => {
  const send = vi.fn()
  const user = setup(send)
  await fill(user)
  await user.clear(screen.getByLabelText('Adet'))
  await user.type(screen.getByLabelText('Adet'), '3')
  await user.click(screen.getByRole('button', { name: 'Gönder' }))
  expect(send).not.toHaveBeenCalled()
  expect(screen.getByText('Adet 1 ile 2 arasında olmalı.')).toBeInTheDocument()
})

test("geçerli girişte webhook'a doğru veri gider", async () => {
  const send = vi.fn().mockResolvedValue()
  const user = setup(send)
  await fill(user)
  await user.click(screen.getByRole('button', { name: 'Gönder' }))
  expect(send).toHaveBeenCalledTimes(1)
  expect(send).toHaveBeenCalledWith(
    orderPayload({
      product,
      name: 'Test Kullanıcı',
      phone: '0500 000 00 00',
      email: 'test@ornek.com',
      quantity: '1',
    }),
  )
  expect(await screen.findByText(/Siparişiniz alındı/)).toBeInTheDocument()
})

test('çift tıklama tek istek gönderir', async () => {
  const send = vi.fn(() => new Promise(() => {}))
  const user = setup(send)
  await fill(user)
  const button = screen.getByRole('button', { name: 'Gönder' })
  await user.click(button)
  await user.click(button)
  expect(send).toHaveBeenCalledTimes(1)
  expect(button).toBeDisabled()
})

test('gönderim hatasında mesaj çıkar, alanlar korunur', async () => {
  const send = vi.fn().mockRejectedValue(new Error('network'))
  const user = setup(send)
  await fill(user)
  await user.click(screen.getByRole('button', { name: 'Gönder' }))
  expect(await screen.findByText('Gönderilemedi, lütfen tekrar deneyin.')).toBeInTheDocument()
  expect(screen.getByLabelText('Ad soyad')).toHaveValue('Test Kullanıcı')
})
