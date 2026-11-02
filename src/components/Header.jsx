import { Link, NavLink } from 'react-router-dom'

// Sabit, saydam üst menü. Altındaki noktalı çizgide kor rengi bir çizgi kaydırdıkça uzar (yalnızca CSS).
export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-bar">
        <Link to="/" className="brand">
          BLACK EMBER
        </Link>
        <nav aria-label="Ana menü">
          <NavLink to="/" end>
            Ana sayfa
          </NavLink>
          <Link to="/#hikaye">Hikâye</Link>
          <Link to="/#isler">Örnek işler</Link>
        </nav>
        <NavLink to="/katalog" className="pill-link">
          Katalog
        </NavLink>
      </div>
      <div className="scroll-line" aria-hidden="true">
        <span />
      </div>
    </header>
  )
}
