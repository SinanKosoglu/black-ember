import { formatPrice } from '../lib/format'
import ProductImage from './ProductImage'

// Stokta olan ürün "Sipariş ver", tükenen ürün "Gelince haber ver" düğmesi gösterir.
export default function ProductCard({ product, onOrder, onNotify }) {
  const inStock = product.stock > 0

  return (
    <article className="product-card">
      <ProductImage product={product} />
      <h3>{product.name}</h3>
      <p className="product-materials">{product.materials}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <p className={inStock ? 'product-stock' : 'product-stock sold-out'}>
        {inStock ? `Stokta: ${product.stock}` : 'Tükendi'}
      </p>
      {inStock ? (
        <button type="button" onClick={() => onOrder(product)}>
          Sipariş ver
        </button>
      ) : (
        <button type="button" className="secondary" onClick={() => onNotify(product)}>
          Gelince haber ver
        </button>
      )}
    </article>
  )
}
