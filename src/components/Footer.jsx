import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-brand" aria-hidden="true">
        BLACK EMBER
      </p>
      <div className="footer-row">
        <div>
          <p>Black Ember · el yapımı bıçak atölyesi</p>
          <p>Sipariş 18 yaş ve üzeri içindir.</p>
          <p>Fotoğraflar temsilidir.</p>
        </div>
        <nav aria-label="Yasal bağlantılar">
          <Link to="/gizlilik">Gizlilik</Link>
          <Link to="/kvkk">KVKK</Link>
        </nav>
      </div>
    </footer>
  )
}
