import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import Privacy from './pages/Privacy'
import Kvkk from './pages/Kvkk'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/katalog" element={<Catalog />} />
        <Route path="/katalog/:slug" element={<ProductPage />} />
        <Route path="/gizlilik" element={<Privacy />} />
        <Route path="/kvkk" element={<Kvkk />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
