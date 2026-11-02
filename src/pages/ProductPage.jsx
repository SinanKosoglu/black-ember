import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import OrderBar from '../components/OrderBar'
import ProductDialog from '../components/ProductDialog'
import Reveal from '../components/Reveal'
import useProductDialog from '../components/useProductDialog'
import { categoryLabel, findProductBySlug, products } from '../data/products'
import { materials } from '../data/showcase'
import { formatPrice } from '../lib/format'

// Aynı kategoriden başlayarak, ürünün kendisi hariç 3 öneri.
function othersFor(product) {
  const rest = products.filter(p => p.id !== product.id)
  const same = rest.filter(p => p.category === product.category)
  const other = rest.filter(p => p.category !== product.category)
  return [...same, ...other].slice(0, 3)
}

function ProductView({ product }) {
  const { active, open, close } = useProductDialog()
  const [first, ...rest] = product.name.split(' ')
  const material = materials.find(m => m.id === product.material)

  useEffect(() => {
    const previous = document.title
    document.title = `${product.name} · Black Ember`
    return () => {
      document.title = previous
    }
  }, [product.name])

  return (
    <article className="product-page">
      <div className="pp-backdrop">
        <img src={product.image} alt={product.name} />
      </div>

      <section className="pp-intro" aria-labelledby="pp-title">
        <p className="label scene-kicker">[{categoryLabel(product.category)}]</p>
        <h1 id="pp-title" className="split-title pp-title">
          <span className="split-a">{first}</span>{' '}
          {rest.length > 0 && <span className="split-b">{rest.join(' ')}</span>}
        </h1>
        <div className="pp-intro-foot">
          <p className="pp-lead">{product.description}</p>
          <p className="label" aria-hidden="true">
            Kaydır
          </p>
        </div>
      </section>

      <section className="pp-block" aria-labelledby="pp-make">
        <Reveal>
          <p className="label">Nasıl yapılır</p>
          <h2 id="pp-make" className="pp-big">
            Ocakta dövüldü,
            <br />
            elde bilendi.
          </h2>
          <p className="pp-text">{product.story}</p>
        </Reveal>
      </section>

      <section className="pp-block pp-material" aria-labelledby="pp-material">
        {material && (
          <Reveal className="pp-inset">
            <img src={material.image} alt={material.name} loading="lazy" />
          </Reveal>
        )}
        <Reveal>
          <p className="label">Malzeme ve ölçü</p>
          <h2 id="pp-material" className="pp-mid">
            {product.materials}
          </h2>
          <ul className="pp-specs">
            {product.specs.map(spec => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="pp-block" aria-labelledby="pp-care">
        <Reveal>
          <p className="label">Bakım</p>
          <h2 id="pp-care" className="pp-big">
            Uzun ömür
            <br />
            için.
          </h2>
          <p className="pp-text">{product.care}</p>
        </Reveal>
      </section>

      <section className="pp-others" aria-labelledby="pp-others">
        <div className="pp-others-head">
          <h2 id="pp-others">Diğer bıçaklar</h2>
          <Link to="/katalog" className="more-link">
            Tüm katalog
          </Link>
        </div>
        <ul>
          {othersFor(product).map(other => (
            <li key={other.id}>
              <Link to={`/katalog/${other.slug}`} className="pp-other">
                <div className="tile-frame">
                  <img src={other.image} alt="" loading="lazy" />
                </div>
                <span className="pp-other-name">{other.name}</span>
                <span className="pp-other-price">{formatPrice(other.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <OrderBar product={product} onOrder={p => open('order', p)} onNotify={p => open('notify', p)} />
      <ProductDialog active={active} onClose={close} />
    </article>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const product = findProductBySlug(slug)
  if (!product) return <Navigate to="/katalog" replace />
  return <ProductView key={product.id} product={product} />
}
