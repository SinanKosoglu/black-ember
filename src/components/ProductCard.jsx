import { formatPrice } from '../lib/format'
import ProductActions from './ProductActions'
import ProductImage from './ProductImage'

export default function ProductCard({ product, onOrder, onNotify }) {
  return (
    <article className="product-card">
      <div className="product-image-frame">
        <ProductImage product={product} />
      </div>
      <h3>{product.name}</h3>
      <p className="product-materials">{product.materials}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <ProductActions product={product} onOrder={onOrder} onNotify={onNotify} />
    </article>
  )
}
