export const SOURCE = 'black-ember-katalog'

export const orderPayload = ({ product, name, phone, email, quantity }) => ({
  event: 'order',
  name: name.trim(),
  productId: product.id,
  productName: product.name,
  phone: phone.trim(),
  email: email.trim(),
  quantity: Number(quantity),
  source: SOURCE,
})

export const notifyPayload = ({ product, name, email }) => ({
  event: 'stock_notification',
  name: name.trim(),
  productId: product.id,
  productName: product.name,
  email: email.trim(),
  source: SOURCE,
})

// no-cors olduğu için yanıt okunamaz; yalnızca ağ hataları fırlatılır.
export const sendWebhook = async (payload, url = import.meta.env.VITE_WEBHOOK_URL) => {
  if (!url) throw new Error('WEBHOOK_URL_MISSING')
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  })
}
