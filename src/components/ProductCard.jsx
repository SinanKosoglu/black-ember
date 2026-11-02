import { Link } from 'react-router-dom'
import { categoryLabel } from '../data/products'
import { formatPrice } from '../lib/format'
import ProductActions from './ProductActions'
import ProductImage from './ProductImage'

export default function ProductCard({ product, onOrder, onNotify }) {
  return (
    <article className="product-card">
      <div className="product-image-frame">
        <ProductImage product={product} />
        <p className="label product-category">{categoryLabel(product.category)}</p>
      </div>
      <div className="product-head">
        <h3>
          {/* Bağlantı CSS ile bütün kartı kaplar; sipariş düğmesi onun üstünde kalır */}
          <Link to={`/katalog/${product.slug}`} className="card-link">
            {product.name}
          </Link>
        </h3>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>
      <p className="product-materials">{product.materials}</p>
      <div className="product-actions">
        <ProductActions product={product} onOrder={onOrder} onNotify={onNotify} />
      </div>
    </article>
  )
}
