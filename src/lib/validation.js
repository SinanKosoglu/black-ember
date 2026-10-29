const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?\d{10,13}$/

const validName = name => String(name ?? '').trim() !== ''
const validEmail = email => EMAIL.test(String(email ?? '').trim())
const validPhone = phone => PHONE.test(String(phone ?? '').replace(/[\s\-.()]/g, ''))
const validQuantity = (quantity, stock) => {
  const text = String(quantity ?? '').trim()
  if (!/^\d+$/.test(text)) return false
  const n = Number(text)
  return n >= 1 && n <= stock
}

export const validateNotify = ({ name, email, consent }) => {
  const errors = {}
  if (!validName(name)) errors.name = 'Adınızı yazın.'
  if (!validEmail(email)) errors.email = 'Geçerli bir e-posta yazın.'
  if (!consent) errors.consent = 'KVKK metnini onaylayın.'
  return errors
}

export const validateOrder = ({ name, phone, email, quantity, adult, consent }, stock) => {
  const errors = {}
  if (!validName(name)) errors.name = 'Adınızı yazın.'
  if (!validPhone(phone)) errors.phone = 'Geçerli bir telefon numarası yazın.'
  if (!validEmail(email)) errors.email = 'Geçerli bir e-posta yazın.'
  if (!validQuantity(quantity, stock)) errors.quantity = `Adet 1 ile ${stock} arasında olmalı.`
  if (!adult) errors.adult = 'Sipariş için 18 yaşından büyük olmalısınız.'
  if (!consent) errors.consent = 'KVKK metnini onaylayın.'
  return errors
}
