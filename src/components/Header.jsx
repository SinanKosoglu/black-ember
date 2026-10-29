import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        BLACK EMBER
      </Link>
      <nav aria-label="Ana menü">
        <NavLink to="/" end>
          Ana sayfa
        </NavLink>
        <NavLink to="/katalog">Katalog</NavLink>
      </nav>
    </header>
  )
}
