export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <h1>Black Ember</h1>
        <p className="lead">El yapımı bıçak atölyesi</p>
      </header>

      <section className="story" aria-labelledby="story-title">
        <h2 id="story-title">Atölye</h2>
        <p>
          Black Ember, küçük bir demirci atölyesi. Her bıçak ocakta ısıtılır,
          örste çekiçle dövülür, suya verilip sertleştirilir ve elde bilenir.
          Seri üretim yok: her parça tek tek yapılır, bu yüzden stoklarımız
          sınırlı. Tükenen bir model ocaktan yeniden çıktığında ilk sizin
          haberiniz olsun.
        </p>
      </section>
    </main>
  )
}
