import { useState } from 'react'
import CatalogQr from '../components/CatalogQr'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import ProductDialog from '../components/ProductDialog'
import useProductDialog from '../components/useProductDialog'
import { products } from '../data/products'

export default function Catalog() {
  const [category, setCategory] = useState('all')
  const { active, open, close } = useProductDialog()

  const visible = category === 'all' ? products : products.filter(p => p.category === category)

  return (
    <>
      <h1>Katalog</h1>
      <CategoryFilter value={category} onChange={setCategory} />
      <div className="product-grid">
        {visible.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onOrder={p => open('order', p)}
            onNotify={p => open('notify', p)}
          />
        ))}
      </div>
      <CatalogQr url={`${window.location.origin}/katalog`} />
      <ProductDialog active={active} onClose={close} />
    </>
  )
}
