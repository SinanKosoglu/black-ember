import { Link } from 'react-router-dom'
import FeaturedScene from '../components/FeaturedScene'
import ProductDialog from '../components/ProductDialog'
import Reveal from '../components/Reveal'
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
// Açılış + öne çıkan ürünler: sayaçtaki toplam sahne sayısı
const SCENES = 1 + featured.length
const pad = n => String(n).padStart(2, '0')

export default function Home() {
  const { active, open, close } = useProductDialog()

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src="/media/hero-knife.webp"
          alt="Koyu zeminde çapraz duran bir şef bıçağı"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <h1 id="hero-title" className="hero-title">
          <span className="hero-a">Black</span> <span className="hero-b">Ember</span>
        </h1>
        <div className="hero-side">
          <p className="hero-text">
            Her bıçak ocakta ısıtılır, örste dövülür,
            <br />
            suya verilir ve elde bilenir.
          </p>
          <Link to="/katalog" className="pill-link">
            Kataloğa bak
          </Link>
        </div>
        <p className="label hero-count" aria-hidden="true">
          [01] — [{pad(SCENES)}]
        </p>
        <p className="label hero-scroll" aria-hidden="true">
          Kaydır
        </p>
      </section>

      <section className="featured" aria-labelledby="featured-title">
        <h2 id="featured-title" className="visually-hidden">
          Örnek ürünler
        </h2>
        {featured.map((product, i) => (
          <FeaturedScene
            key={product.id}
            product={product}
            number={i + 2}
            total={SCENES}
            onOrder={p => open('order', p)}
            onNotify={p => open('notify', p)}
          />
        ))}
        <div className="featured-more">
          <Link to="/katalog" className="more-link">
            Tüm katalog
          </Link>
        </div>
      </section>

      <section className="banner" aria-label="Dövme">
        <img className="banner-image" src="/media/forge-banner.webp" alt="" loading="lazy" />
        <p className="banner-text">
          Her bıçak örste,
          <br />
          tek tek dövülür.
        </p>
      </section>

      <section id="hikaye" className="home-section story" aria-labelledby="story-title">
        <Reveal className="section-head">
          <p className="label">Atölye</p>
          <h2 id="story-title">Hikâye</h2>
        </Reveal>
        <Reveal className="story-body">
          <p className="story-intro">
            Black Ember, küçük bir demirci atölyesi. Her bıçak ocakta ısıtılır, örste çekiçle
            dövülür, suya verilip sertleştirilir ve elde bilenir. Seri üretim yok: her parça tek
            tek yapılır, bu yüzden stoklarımız sınırlı. Tükenen bir model ocaktan yeniden
            çıktığında ilk sizin haberiniz olsun.
          </p>
          <ol className="steps">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="label">[{pad(i + 1)}]</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section id="isler" className="home-section" aria-labelledby="works-title">
        <Reveal className="section-head">
          <p className="label">Sipariş üzerine</p>
          <h2 id="works-title">Örnek işler</h2>
        </Reveal>
        <ul className="tile-grid">
          {works.map(work => (
            <li key={work.id}>
              <Reveal>
                <div className="tile-frame">
                  <img src={work.image} alt={work.title} loading="lazy" />
                </div>
                <h3>{work.title}</h3>
                <p>{work.note}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="materials-title">
        <Reveal className="section-head">
          <p className="label">Ne ile yapılır</p>
          <h2 id="materials-title">Malzemeler</h2>
        </Reveal>
        <ul className="tile-grid">
          {materials.map(material => (
            <li key={material.id}>
              <Reveal>
                <div className="tile-frame">
                  <img src={material.image} alt={material.name} loading="lazy" />
                </div>
                <h3>{material.name}</h3>
                <p>{material.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <Reveal>
          <p className="label">Sipariş</p>
          <h2 id="closing-title">Sipariş ya da soru için</h2>
          <p>Stoktaki bıçağı katalogdan isteyin; tükenmişse yeniden yapılınca haber verelim.</p>
          <Link to="/katalog" className="pill-link">
            Kataloğa git
          </Link>
        </Reveal>
      </section>

      <ProductDialog active={active} onClose={close} />
    </>
  )
}
