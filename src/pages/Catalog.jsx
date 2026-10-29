import { useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Catalog() {
  const [category, setCategory] = useState('all')
  // Sipariş ve haber verme pencereleri formlar eklenince buraya bağlanacak.
  const [, setActive] = useState(null)
  const open = (kind, product) => setActive({ kind, product })

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
    </>
  )
}
