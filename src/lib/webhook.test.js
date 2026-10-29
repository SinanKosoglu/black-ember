import { SOURCE, orderPayload, notifyPayload, sendWebhook } from './webhook'

const product = { id: 'p1', name: 'Test Bıçağı' }

afterEach(() => vi.unstubAllGlobals())

test('orderPayload düz ve tam bir nesne üretir', () => {
  const payload = orderPayload({
    product,
    name: '  Test Kullanıcı ',
    phone: '0500 000 00 00',
    email: ' test@ornek.com ',
    quantity: '2',
  })
  expect(payload).toEqual({
    event: 'order',
    name: 'Test Kullanıcı',
    productId: 'p1',
    productName: 'Test Bıçağı',
    phone: '0500 000 00 00',
    email: 'test@ornek.com',
    quantity: 2,
    source: SOURCE,
  })
})

test('notifyPayload düz ve tam bir nesne üretir', () => {
  const payload = notifyPayload({
    product,
    name: ' Test Kullanıcı ',
    email: ' test@ornek.com ',
  })
  expect(payload).toEqual({
    event: 'stock_notification',
    name: 'Test Kullanıcı',
    productId: 'p1',
    productName: 'Test Bıçağı',
    email: 'test@ornek.com',
    source: 'black-ember-katalog',
  })
})

test('sendWebhook adres yoksa hata fırlatır', async () => {
  await expect(sendWebhook({ event: 'order' }, undefined)).rejects.toThrow('WEBHOOK_URL_MISSING')
})

test('sendWebhook doğru seçeneklerle fetch çağırır', async () => {
  const fetchMock = vi.fn(() => Promise.resolve())
  vi.stubGlobal('fetch', fetchMock)
  const payload = { event: 'order', name: 'Test Kullanıcı' }
  await expect(sendWebhook(payload, 'https://ornek.test')).resolves.toBeUndefined()
  expect(fetchMock).toHaveBeenCalledWith('https://ornek.test', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  })
})

test('sendWebhook ağ hatasını iletir', async () => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('ağ'))))
  await expect(sendWebhook({}, 'https://ornek.test')).rejects.toThrow('ağ')
})
