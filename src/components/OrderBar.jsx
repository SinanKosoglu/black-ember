import { formatPrice } from '../lib/format'
import ProductActions from './ProductActions'

// Detay sayfasının altında hep duran fiyat ve sipariş düğmesi. Stok kuralı ProductActions'ta.
export default function OrderBar({ product, onOrder, onNotify }) {
  return (
    <div className="order-bar" role="region" aria-label="Sipariş">
      <p className="order-bar-price">{formatPrice(product.price)}</p>
      <ProductActions product={product} onOrder={onOrder} onNotify={onNotify} />
    </div>
  )
}
