import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductDialog from '../components/ProductDialog'
import useProductDialog from '../components/useProductDialog'
import { products } from '../data/products'
import { materials, works } from '../data/showcase'

const STEPS = [
  { title: 'Ocak', text: 'Çelik, kömür ateşinde kızarana kadar ısıtılır.' },
  { title: 'Örs', text: 'Kızgın çelik, örs denen demir tezgâhın üstünde çekiçle biçimlenir.' },
  { title: 'Su verme', text: 'Kızgın çeliği suya ya da yağa daldırıp sertleştirmek.' },
  { title: 'Bileme', text: 'Ağız, taş üzerinde elde inceltilir ve keskinleştirilir.' },
]

const featured = products.filter(p => p.featured)

export default function Home() {
  const { active, open, close } = useProductDialog()

  return (
    <>
      <section className="hero">
        <img className="hero-video" src="/media/forge-video.svg" alt="Yapım videosu yakında" />
        <h1>Black Ember</h1>
        <p className="lead">Her bıçak ocakta tek tek dövülür.</p>
        <Link to="/katalog" className="button-link">
          Kataloğa bak
        </Link>
      </section>

      <section className="home-section story" aria-labelledby="story-title">
        <h2 id="story-title">Hikâye</h2>
        <p>
          Black Ember, küçük bir demirci atölyesi. Her bıçak ocakta ısıtılır,
          örste çekiçle dövülür, suya verilip sertleştirilir ve elde bilenir.
          Seri üretim yok: her parça tek tek yapılır, bu yüzden stoklarımız
          sınırlı. Tükenen bir model ocaktan yeniden çıktığında ilk sizin
          haberiniz olsun.
        </p>
        <ol className="steps">
          {STEPS.map(step => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section" aria-labelledby="featured-title">
        <h2 id="featured-title">Örnek ürünler</h2>
        <div className="product-grid">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={p => open('order', p)}
              onNotify={p => open('notify', p)}
            />
          ))}
        </div>
        <Link to="/katalog" className="more-link">
          Tüm katalog
        </Link>
      </section>

      <section className="home-section" aria-labelledby="works-title">
        <h2 id="works-title">Örnek işler</h2>
        <ul className="tile-grid">
          {works.map(work => (
            <li key={work.id}>
              <img src={work.image} alt={work.title} loading="lazy" />
              <h3>{work.title}</h3>
              <p>{work.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="materials-title">
        <h2 id="materials-title">Malzemeler</h2>
        <ul className="tile-grid">
          {materials.map(material => (
            <li key={material.id}>
              <img src={material.image} alt={material.name} loading="lazy" />
              <h3>{material.name}</h3>
              <p>{material.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <ProductDialog active={active} onClose={close} />
    </>
  )
}
