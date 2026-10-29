import { useState } from 'react'
import { validateOrder } from '../lib/validation'
import { orderPayload, sendWebhook } from '../lib/webhook'

// status: idle | sending | sent | error. Hatalar yalnızca ilk gönderim denemesinden sonra görünür.
export default function OrderForm({ product, send = sendWebhook }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '1',
    adult: false,
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const change = event => {
    const { name, type, value, checked } = event.target
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async event => {
    event.preventDefault()
    if (status === 'sending') return
    const found = validateOrder(values, product.stock)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    try {
      await send(orderPayload({ product, ...values }))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return <p role="status">Teşekkürler! Siparişiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>
  }

  return (
    <form onSubmit={submit} noValidate>
      <p className="form-note">Sipariş 18 yaş ve üzeri içindir.</p>
      <div className="field">
        <label htmlFor="order-name">Ad soyad</label>
        <input id="order-name" name="name" autoComplete="name" value={values.name} onChange={change} />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="order-email">E-posta</label>
        <input id="order-email" name="email" type="email" autoComplete="email" value={values.email} onChange={change} />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="order-phone">Telefon</label>
        <input id="order-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={change} />
        {errors.phone && <p className="field-error">{errors.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor="order-quantity">Adet</label>
        <input
          id="order-quantity"
          name="quantity"
          type="number"
          min="1"
          max={product.stock}
          value={values.quantity}
          onChange={change}
        />
        {errors.quantity && <p className="field-error">{errors.quantity}</p>}
      </div>
      <div className="field check">
        <label>
          <input name="adult" type="checkbox" checked={values.adult} onChange={change} />
          18 yaşından büyüğüm
        </label>
        {errors.adult && <p className="field-error">{errors.adult}</p>}
      </div>
      <div className="field check">
        <label>
          <input name="consent" type="checkbox" checked={values.consent} onChange={change} />
          <span>
            <a href="/kvkk" target="_blank" rel="noopener noreferrer">
              KVKK Aydınlatma Metni
            </a>'ni okudum, onaylıyorum.
          </span>
        </label>
        {errors.consent && <p className="field-error">{errors.consent}</p>}
      </div>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Gönderilemedi, lütfen tekrar deneyin.
        </p>
      )}
      <button type="submit" disabled={status === 'sending'}>
        Gönder
      </button>
    </form>
  )
}
