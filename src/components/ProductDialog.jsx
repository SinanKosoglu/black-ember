import { useEffect } from 'react'
import NotifyForm from './NotifyForm'
import OrderForm from './OrderForm'

// Sipariş ve "Gelince haber ver" formlarını ürün adıyla birlikte pencerede gösterir.
export default function ProductDialog({ active, onClose }) {
  useEffect(() => {
    if (!active) return undefined
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active, onClose])

  if (!active) return null
  const { kind, product } = active
  const Form = kind === 'order' ? OrderForm : NotifyForm

  return (
    <div className="dialog-backdrop">
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="dialog-head">
          <h2 id="dialog-title">{product.name}</h2>
          <button type="button" className="secondary" onClick={onClose}>
            Kapat
          </button>
        </div>
        {kind === 'notify' && (
          <p className="form-note">Tükendi. Yeniden yapılınca size haber verelim.</p>
        )}
        <Form key={kind + product.id} product={product} />
      </div>
    </div>
  )
}
