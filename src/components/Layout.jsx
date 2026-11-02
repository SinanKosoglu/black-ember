import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

// Ana sayfa ekranı kenardan kenara kullanır; diğer sayfalar dar bir sütunda durur.
export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <Header />
      <main className={pathname === '/' ? 'home' : 'page'}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
