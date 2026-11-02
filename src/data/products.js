// Katalogdaki ürünler. Görseller şimdilik kategori başına bir temsili fotoğraf (kaynaklar README).
export const CATEGORIES = [
  { id: 'kitchen', label: 'Mutfak' },
  { id: 'outdoor', label: 'Kamp ve av' },
  { id: 'folding', label: 'Çakı' },
  { id: 'care', label: 'Bakım' },
]

export function categoryLabel(id) {
  return CATEGORIES.find(c => c.id === id)?.label ?? ''
}

const image = category => `/media/category-${category}.webp`

export const products = [
  {
    id: 'chef-knife',
    name: 'Şef bıçağı',
    category: 'kitchen',
    price: 2400,
    stock: 2,
    materials: 'Karbon çeliği, ceviz sap',
    featured: true,
  },
  {
    id: 'santoku',
    name: 'Santoku',
    category: 'kitchen',
    price: 2200,
    stock: 0,
    materials: 'Karbon çeliği, zeytin sap',
    featured: false,
  },
  {
    id: 'bread-knife',
    name: 'Ekmek bıçağı',
    category: 'kitchen',
    price: 1900,
    stock: 3,
    materials: 'Paslanmaz çelik, dişbudak sap',
    featured: false,
  },
  {
    id: 'camp-knife',
    name: 'Kamp bıçağı',
    category: 'outdoor',
    price: 3100,
    stock: 1,
    materials: 'Karbon çeliği, meşe sap, deri kın',
    featured: true,
  },
  {
    id: 'hunting-knife',
    name: 'Av bıçağı',
    category: 'outdoor',
    price: 3600,
    stock: 0,
    materials: 'Şam çeliği, boynuz sap, deri kın',
    featured: false,
  },
  {
    id: 'folding-knife',
    name: 'Katlanır çakı',
    category: 'folding',
    price: 1800,
    stock: 4,
    materials: 'Karbon çeliği, ceviz sap, elle açılır',
    featured: true,
  },
  {
    id: 'pocket-knife',
    name: 'Küçük cep çakısı',
    category: 'folding',
    price: 1400,
    stock: 0,
    materials: 'Paslanmaz çelik, armut sap, elle açılır',
    featured: false,
  },
  {
    id: 'whetstone',
    name: 'Bileme taşı',
    category: 'care',
    price: 650,
    stock: 5,
    materials: 'Çift yüzlü su taşı (1000/6000)',
    featured: false,
  },
  {
    id: 'leather-sheath',
    name: 'Deri kın',
    category: 'care',
    price: 900,
    stock: 2,
    materials: 'Bitkisel tabaklanmış deri, el dikişi',
    featured: false,
  },
].map(p => ({ ...p, image: image(p.category) }))
