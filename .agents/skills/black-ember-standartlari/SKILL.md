---
name: black-ember-standartlari
description: Black Ember sitesinin bileşen kalıpları ve webhook veri biçimi. Katalog, ürün kartı, sipariş/haber verme formu gibi bir bileşen eklerken ya da değiştirirken, ürün verisine dokunurken veya webhook'a veri gönderen bir özellik yazarken kullan.
---

# Black Ember standartları

Genel kurallar (Türkçe metin, İngilizce kod adı, test, commit, KVKK, yasak bıçak türleri) `AGENTS.md`'de. Bu skill kodun **kalıplarını** anlatır: yeni kodu, aynı işi yapan mevcut dosyanın kardeşi gibi yaz.

## Dosya düzeni

- `src/pages/` — rota başına bir sayfa: `Home`, `Catalog`, `ProductPage` (`/katalog/:slug`), `Privacy`, `Kvkk`. Rotalar `src/App.jsx`'te; menü `Header`, yasal bağlantılar `Footer`.
- `src/components/` — tekrar kullanılan parçalar; test dosyası yanında (`ProductCard.test.jsx`).
- `src/data/` — sabit veri: `products.js` (ürünler, `CATEGORIES`, `categoryLabel`), `showcase.js` (örnek işler, malzemeler).
- `src/lib/` — saf yardımcılar: `format.js` (`formatPrice`), `validation.js`, `webhook.js`.
- `public/media/` — görseller: Unsplash'ten temsili WebP fotoğraflar, kaynakları README'de. Ücretli görsel üretimi yapılmaz.

## Bileşen kalıpları

- `export default function Name(...)`; tek sorumluluk. Gerekirse dosya başında tek satırlık Türkçe yorum.
- **Veri aşağı, olay yukarı.** Kart durumu değiştirmez: `ProductCard({ product, onOrder, onNotify })` düğmeye basılınca olayı bildirir. Pencere durumu sayfada yaşar: `const { active, open, close } = useProductDialog()` ve `<ProductDialog active={active} onClose={close} />`. Türler: `'order'` | `'notify'`.
- Stok kuralı tek yerde: `stock > 0` → "Sipariş ver", `stock === 0` → "Gelince haber ver" (`ProductActions`; `ProductCard`, ana sayfadaki `FeaturedScene` ve ürün sayfasındaki `OrderBar` kullanır). Sipariş formu yalnızca stoktaki ürün için açılır.
- Kaydırınca beliren her şey `useInView` ile: `Reveal` sarmalayıcısı ya da `is-in` / `is-waiting` sınıfı. Hareket CSS'te; `prefers-reduced-motion` bloğu hepsini kapatır. IntersectionObserver yoksa içerik baştan görünür (testler buna güvenir).
- Formlar (`OrderForm`, `NotifyForm`): `send = sendWebhook` prop'u ile enjekte edilir (testte `vi.fn()`); durum `idle | sending | sent | error`; hatalar ilk gönderim denemesinden sonra, alanın altında `.field-error`; `sending` iken düğme pasif. Gönderim hatasında "Gönderilemedi, lütfen tekrar deneyin." ve girilenler korunur.
- Fiyat her zaman `formatPrice(n)` → `"2.400 TL"`. Kategori etiketi her zaman `categoryLabel(id)`; etiket bileşende yazılmaz.
- Erişilebilirlik: bölümler `<section aria-labelledby>`, süzgeç düğmeleri `aria-pressed`, pencere `role="dialog" aria-modal="true"`, Escape ile kapanır.
- Stil `src/index.css`'te; renkler yalnızca `--bg --surface --text --muted --ember --line` değişkenlerinden.

## Ürün verisi

Her ürün: `{ id, name, category, price, stock, materials, image, featured }`, ayrıca ürün sayfası için `slug` (Türkçe karaktersiz, `^[a-z0-9-]+$`), `description`, `story`, `specs` (dizi), `care`, `material` (`steel | wood | leather`, `showcase.materials` id'si). Ürün adrese göre `findProductBySlug(slug)` ile bulunur. `category` ∈ `kitchen | outdoor | folding | care`. Çakılar "elle açılır" katlanır bıçaklardır; sustalı, kelebek ve benzeri yasak türler eklenmez — `products.test.js` bunu denetler. Ana sayfada tam 3 `featured` ürün.

## Testler

Vitest + Testing Library, `globals: true`. Sayfa testleri `renderAt(path)` (`src/test-utils.jsx`) ile; sorgular rol ve erişilebilir adla (`getByRole('button', { name: 'Sipariş ver' })`). Test verisi yalnızca "Test Kullanıcı", `0500 000 00 00`, `test@ornek.com`.

## Webhook

Veri biçimi ve gönderim kuralları: [webhook-formati.md](webhook-formati.md). Biçime dokunan her değişiklik o dosyayı, testleri ve Gizlilik/KVKK metinlerini aynı commit'te günceller.
