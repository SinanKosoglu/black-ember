import { categoryLabel } from '../data/products'
import { formatPrice } from '../lib/format'
import ProductActions from './ProductActions'
import useInView from './useInView'

const pad = n => String(n).padStart(2, '0')

// Ana sayfada öne çıkan bir ürünün ekran boyu sahnesi. Görünür olunca fotoğraf dikey şeritlerle açılır.
export default function FeaturedScene({ product, number, total, onOrder, onNotify }) {
  const [ref, inView] = useInView(0.35)
  const [first, ...rest] = product.name.split(' ')
  const titleId = `scene-${product.id}`

  return (
    <section
      ref={ref}
      className={`scene ${inView ? 'is-in' : 'is-waiting'}`}
      aria-labelledby={titleId}
    >
      <div className="scene-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="scene-shade" />
      <div className="scene-body">
        <p className="label scene-kicker">
          [{pad(number)}] {categoryLabel(product.category)}
        </p>
        <h2 id={titleId} className="split-title">
          <span className="split-a">{first}</span>{' '}
          {rest.length > 0 && <span className="split-b">{rest.join(' ')}</span>}
        </h2>
        <div className="scene-info">
          {product.description && <p className="scene-desc">{product.description}</p>}
          <p className="product-materials">{product.materials}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
          <ProductActions product={product} onOrder={onOrder} onNotify={onNotify} />
        </div>
      </div>
      <p className="label scene-count" aria-hidden="true">
        [{pad(number)}] — [{pad(total)}]
      </p>
    </section>
  )
}
