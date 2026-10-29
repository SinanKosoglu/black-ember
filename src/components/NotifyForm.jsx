import { useState } from 'react'
import { validateNotify } from '../lib/validation'
import { notifyPayload, sendWebhook } from '../lib/webhook'

// status: idle | sending | sent | error. Hatalar yalnızca ilk gönderim denemesinden sonra görünür.
export default function NotifyForm({ product, send = sendWebhook }) {
  const [values, setValues] = useState({ name: '', email: '', consent: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const change = event => {
    const { name, type, value, checked } = event.target
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async event => {
    event.preventDefault()
    if (status === 'sending') return
    const found = validateNotify(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    try {
      await send(notifyPayload({ product, ...values }))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return <p role="status">Teşekkürler! Ürün gelince size haber vereceğiz.</p>
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="notify-name">Ad soyad</label>
        <input id="notify-name" name="name" autoComplete="name" value={values.name} onChange={change} />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="notify-email">E-posta</label>
        <input id="notify-email" name="email" type="email" autoComplete="email" value={values.email} onChange={change} />
        {errors.email && <p className="field-error">{errors.email}</p>}
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
