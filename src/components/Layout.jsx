import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

// Ana sayfa ve ürün sayfaları ekranı kenardan kenara kullanır; diğer sayfalar dar bir sütunda durur.
export default function Layout() {
  const { pathname } = useLocation()
  const fullBleed = pathname === '/' || pathname.startsWith('/katalog/')
  return (
    <>
      <Header />
      <main className={fullBleed ? 'full' : 'page'}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
