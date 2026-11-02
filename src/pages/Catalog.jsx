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
      <p className="label">Black Ember</p>
      <h1>Katalog</h1>
      <p className="catalog-intro">
        Her bıçak tek tek yapılır, stoklar sınırlıdır. Tükenen bir model için "Gelince haber ver"
        deyin; ocaktan yeniden çıkınca size yazalım.
      </p>
      <div className="catalog-bar">
        <CategoryFilter value={category} onChange={setCategory} />
        <p className="label" aria-live="polite">
          {visible.length} ürün
        </p>
      </div>
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
