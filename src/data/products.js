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

// Detay sayfası alanları: slug (adres), description, story (yapım), specs (ölçüler), care (bakım),
// material (ara fotoğraf için showcase.materials id'si: steel | wood | leather).
export const products = [
  {
    id: 'chef-knife',
    slug: 'sef-bicagi',
    name: 'Şef bıçağı',
    category: 'kitchen',
    price: 2400,
    stock: 2,
    materials: 'Karbon çeliği, ceviz sap',
    description: 'Mutfağın her işini gören bıçak. İnce doğrar, uzun süre keskin kalır.',
    story:
      'Karbon çeliği ocakta kızarana kadar ısıtılır, örste ince bir ağız elde edilene kadar dövülür. Suya verilerek, yani kızgınken suya daldırılarak sertleştirilir; sonra ağız taş üzerinde elde bilenir. Sap, tek parça cevizden oyulur ve yağla korunur.',
    specs: ['Ağız 20 cm', 'Toplam 33 cm', '190 g'],
    care: 'Kullandıktan sonra elde yıkayıp hemen kurulayın. Karbon çeliği zamanla koyulaşır; bu leke değil, bıçağın kendi rengidir. Ara sıra ince bir kat yağ sürün.',
    material: 'wood',
    featured: true,
  },
  {
    id: 'santoku',
    slug: 'santoku',
    name: 'Santoku',
    category: 'kitchen',
    price: 2200,
    stock: 0,
    materials: 'Karbon çeliği, zeytin sap',
    description: 'Geniş, düz ağızlı Japon tipi mutfak bıçağı. Sebzeyi ince ve düzgün dilimler.',
    story:
      'Santoku, şef bıçağından kısa ve geniştir; ucu aşağı doğru kıvrılır. Ağız örste düz dövülür, ince bilenir ki domatesi ezmeden kessin. Zeytin sapın damarları her bıçakta farklıdır.',
    specs: ['Ağız 17 cm', 'Toplam 30 cm', '170 g'],
    care: 'Elde yıkayın, bulaşık makinesine koymayın. Kemik ve donmuş yiyecekte kullanmayın; ince ağız bunun için yapılmadı.',
    material: 'wood',
    featured: false,
  },
  {
    id: 'bread-knife',
    slug: 'ekmek-bicagi',
    name: 'Ekmek bıçağı',
    category: 'kitchen',
    price: 1900,
    stock: 3,
    materials: 'Paslanmaz çelik, dişbudak sap',
    description: 'Dişli ağzıyla kıtır kabuğu ezmeden keser. Uzun ve hafif.',
    story:
      'Dişler, ağız inceltildikten sonra tek tek elde açılır. Paslanmaz çelik seçildi, çünkü ekmek bıçağı çoğu zaman tezgâhta açıkta durur. Dişbudak sap hafiftir, uzun ağzı dengeler.',
    specs: ['Ağız 23 cm', 'Toplam 36 cm', '160 g'],
    care: 'Elde yıkayıp kurulayın. Dişli ağız düz taşta bilenmez; körelince atölyeye gönderin, yeniden açalım.',
    material: 'steel',
    featured: false,
  },
  {
    id: 'camp-knife',
    slug: 'kamp-bicagi',
    name: 'Kamp bıçağı',
    category: 'outdoor',
    price: 3100,
    stock: 1,
    materials: 'Karbon çeliği, meşe sap, deri kın',
    description: 'Ateş başında ve yürüyüşte. Kalın sırtı odun yarar, deri kını kemerde taşınır.',
    story:
      'Kalın bir çelik çubuktan dövülür; sırtı kalın bırakılır ki odun yarabilsin. Ağız, mutfak bıçağından daha kalın açıyla bilenir, darbeye dayanır. Meşe sap ıslakken de kaymaz.',
    specs: ['Ağız 12 cm', 'Toplam 24 cm', '240 g', 'Sırt 5 mm'],
    care: 'Kamptan dönünce temizleyip kurulayın ve ağza ince yağ sürün. Islak bıçağı deri kının içinde bırakmayın.',
    material: 'leather',
    featured: true,
  },
  {
    id: 'hunting-knife',
    slug: 'av-bicagi',
    name: 'Av bıçağı',
    category: 'outdoor',
    price: 3600,
    stock: 0,
    materials: 'Şam çeliği, boynuz sap, deri kın',
    description: 'Dalga desenli Şam çeliği ve boynuz sap. Sağlam, dengeli, kınıyla birlikte.',
    story:
      'Şam çeliği, iki farklı çeliğin üst üste konup defalarca katlanıp dövülmesiyle yapılır. Asitle yıkanınca katmanlar dalga deseni olarak ortaya çıkar; her bıçağın deseni tektir.',
    specs: ['Ağız 14 cm', 'Toplam 26 cm', '230 g'],
    care: 'Kullandıktan sonra temizleyip kurulayın, desen zamanla solarsa atölyede yeniden belirginleştiririz.',
    material: 'steel',
    featured: false,
  },
  {
    id: 'folding-knife',
    slug: 'katlanir-caki',
    name: 'Katlanır çakı',
    category: 'folding',
    price: 1800,
    stock: 4,
    materials: 'Karbon çeliği, ceviz sap, elle açılır',
    description: 'Cepte taşınan küçük yardımcı. Ağzı elle açılır, ceviz sapı avuca oturur.',
    story:
      'Ağız tırnakla tutulup elle açılır; içinde yay ya da düğme yoktur. Pirinç pim ağzı sapa bağlar, sap ceviz kütükten iki yarım olarak oyulur.',
    specs: ['Ağız 8 cm', 'Açık 19 cm', '95 g'],
    care: 'Pimin çevresine ara sıra bir damla yağ damlatın. Ağzı kapatmadan önce silin.',
    material: 'wood',
    featured: true,
  },
  {
    id: 'pocket-knife',
    slug: 'kucuk-cep-cakisi',
    name: 'Küçük cep çakısı',
    category: 'folding',
    price: 1400,
    stock: 0,
    materials: 'Paslanmaz çelik, armut sap, elle açılır',
    description: 'Anahtarlık kadar küçük. Paket açar, ip keser, meyve soyar.',
    story:
      'Ağız paslanmaz çelikten, elle açılır. Armut sapı açık renkli ve sıkı dokuludur; kullandıkça elin yağıyla koyulaşır.',
    specs: ['Ağız 6 cm', 'Açık 14 cm', '55 g'],
    care: 'Nemli kalmışsa açıp kurumaya bırakın. Pime ara sıra bir damla yağ yeterli.',
    material: 'steel',
    featured: false,
  },
  {
    id: 'whetstone',
    slug: 'bileme-tasi',
    name: 'Bileme taşı',
    category: 'care',
    price: 650,
    stock: 5,
    materials: 'Çift yüzlü su taşı (1000/6000)',
    description: 'Bıçağı evde bilemek için çift yüzlü su taşı. Kaba yüz açar, ince yüz parlatır.',
    story:
      'Sayılar taşın inceliğini gösterir: 1000 yüzü körelen ağzı yeniden açar, 6000 yüzü ağzı parlatıp keskinleştirir. Atölyede her bıçak bu ikilinin üzerinde bitirilir.',
    specs: ['18 × 6 × 3 cm', '1000 ve 6000 kum', 'Kaymaz taban'],
    care: 'Kullanmadan önce 10 dakika suda bekletin. Kullandıktan sonra durulayıp gölgede kurutun.',
    material: 'steel',
    featured: false,
  },
  {
    id: 'leather-sheath',
    slug: 'deri-kin',
    name: 'Deri kın',
    category: 'care',
    price: 900,
    stock: 2,
    materials: 'Bitkisel tabaklanmış deri, el dikişi',
    description: 'Bıçağın kılıfı. Kalın deriden elde dikilir, kemere takılır.',
    story:
      'Bitkisel tabaklama, deriyi kimyasal yerine ağaç kabuğu özleriyle işler; deri sert başlar, zamanla bıçağın biçimini alır. Dikişler mumlu iple elde atılır.',
    specs: ['Kemer halkası 5 cm', 'Bıçağa göre ölçülür'],
    care: 'Yılda bir iki kez deri yağı sürün. Islanırsa ateşe yakın değil, oda sıcaklığında kurutun.',
    material: 'leather',
    featured: false,
  },
].map(p => ({ ...p, image: image(p.category) }))

export function findProductBySlug(slug) {
  return products.find(p => p.slug === slug)
}
