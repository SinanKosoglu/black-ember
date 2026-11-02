import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>Black Ember · el yapımı bıçak atölyesi</p>
      <p>Sipariş 18 yaş ve üzeri içindir.</p>
      <p>Fotoğraflar temsilidir.</p>
      <nav aria-label="Yasal bağlantılar">
        <Link to="/gizlilik">Gizlilik</Link>
        <Link to="/kvkk">KVKK</Link>
      </nav>
    </footer>
  )
}
