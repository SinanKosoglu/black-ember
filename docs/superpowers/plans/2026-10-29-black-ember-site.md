# Black Ember Sitesi — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Black Ember bıçak atölyesinin ana sayfa, katalog, sipariş/haber verme formları ve Gizlilik/KVKK sayfalarından oluşan Türkçe sitesini kurmak.

**Architecture:** Vite + React tek sayfa uygulaması; `react-router-dom` ile dört rota. Veri `src/data/` altındaki sabit dosyalarda; formlar `src/lib/webhook.js` üzerinden webhook'a POST eder. Görseller `public/media/` altında SVG yer tutucu.

**Tech Stack:** React 19, Vite 8, react-router-dom 7, Vitest 5 + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-10-29-black-ember-design.md`

## Global Constraints

- Kullanıcıya görünen her metin Türkçe; kod içi adlar İngilizce. Dil seçici yok.
- Sunucu/veritabanı yok. Webhook adresi yalnızca `import.meta.env.VITE_WEBHOOK_URL`; kodda adres yazılmaz.
- Katalogda sustalı, kelebek ve benzeri yasak tür yok.
- "Sipariş 18 yaş ve üzeri içindir." alt bilgide ve sipariş formunda görünür.
- Görseller yer tutucu SVG; ücretli üretim yok; gerçek kişi adı/fotoğrafı yok.
- Test verisi: "Test Kullanıcı", `0500 000 00 00`, `test@ornek.com`.
- Her görev ayrı Türkçe commit; commit'ten önce `npm test` geçer. Commit mesajı sonu: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Mevcut renk değişkenleri (`--bg`, `--surface`, `--text`, `--muted`, `--ember`, `--line`) korunur.
- Spec'te olmayan özellik eklenmez.

## Review Focus

1. Bilinmeyen adres (`/xyz`) → ana sayfaya yönlenir, boş ekran olmaz. (Görev 1)
2. "Gönder"e iki kez basmak → tek webhook isteği; gönderim sürerken düğme pasif. (Görev 6)
3. Adet alanı boş, `0`, `1.5` ya da stoktan büyük → hata; ad yalnızca boşluksa → hata. (Görev 5)
4. `+90 500 000 00 00` ve `(0500) 000-00-00` geçerli telefon sayılır. (Görev 5)
5. A ürününün penceresini kapatıp B'yi açınca form B'nin adını gösterir ve boştur; Escape pencereyi kapatır. (Görev 6)

---

### Task 1: Site iskeleti — yönlendirme, Header, Footer

**Files:**
- Modify: `package.json` (bağımlılık: `react-router-dom`)
- Modify: `src/main.jsx` (`<BrowserRouter>` ile sar)
- Modify: `src/App.jsx` (rotalar)
- Create: `src/components/Layout.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/ScrollToTop.jsx`
- Create: `src/pages/Home.jsx`, `src/pages/Catalog.jsx`, `src/pages/Privacy.jsx`, `src/pages/Kvkk.jsx` (şimdilik yalnızca `<h1>`)
- Create: `src/test-utils.jsx`
- Modify: `src/App.test.jsx`, `src/index.css`

**Interfaces:**
- Produces: `renderAt(path: string)` (`src/test-utils.jsx`) → `<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>` render eder, Testing Library sonucunu döner. Rotalar: `/`, `/katalog`, `/gizlilik`, `/kvkk`, `*` → `<Navigate to="/" replace />`. Sayfa h1'leri: Home "Black Ember", Catalog "Katalog", Privacy "Gizlilik Politikası", Kvkk "KVKK Aydınlatma Metni".

- [ ] **Step 1:** `npm install react-router-dom@7`
- [ ] **Step 2: Failing tests** — `src/App.test.jsx` mevcut testi kaldırıp şunları yaz:
  - `'menüden kataloğa gidilir'`: `renderAt('/')`, `user.click(getByRole('link', { name: 'Katalog' }))` → `getByRole('heading', { level: 1, name: 'Katalog' })`.
  - `'her rota kendi başlığını gösterir'`: `/gizlilik` → "Gizlilik Politikası", `/kvkk` → "KVKK Aydınlatma Metni".
  - `'bilinmeyen adres ana sayfaya yönlenir'`: `renderAt('/xyz')` → h1 "Black Ember".
  - `'alt bilgide 18 yaş notu ve yasal bağlantılar var'`: `getByText('Sipariş 18 yaş ve üzeri içindir.')`, `getByRole('link', { name: 'Gizlilik' })` href `/gizlilik`, `getByRole('link', { name: 'KVKK' })` href `/kvkk`.
- [ ] **Step 3:** `npx vitest run src/App.test.jsx` → FAIL.
- [ ] **Step 4: Implement.** `Layout` = `Header` + `<main className="page"><Outlet/></main>` + `Footer` + `ScrollToTop`. `Header`: "BLACK EMBER" ana sayfa bağlantısı, `NavLink`'ler "Ana sayfa", "Katalog". `Footer`: "Black Ember · el yapımı bıçak atölyesi", 18+ notu, "Gizlilik" ve "KVKK" bağlantıları. `ScrollToTop`: `useLocation().pathname` değişince `window.scrollTo(0, 0)`. `Home` şimdilik mevcut `App.jsx` içeriğini (başlık + hikâye paragrafı) taşır. Header/footer stilleri `index.css`'e.
- [ ] **Step 5:** `npm test` → PASS. (jsdom `scrollTo` uyarısı verirse `test-setup.js`'e `window.scrollTo = () => {}` ekle.)
- [ ] **Step 6: Commit** — "Site iskeleti: rotalar, üst menü ve alt bilgi"

### Task 2: Veri modeli ve yer tutucu görseller

**Files:**
- Create: `src/data/products.js`, `src/data/showcase.js`, `src/lib/format.js`
- Create: `public/media/` altında SVG'ler: `placeholder-kitchen.svg`, `placeholder-outdoor.svg`, `placeholder-folding.svg`, `placeholder-care.svg`, `work-1.svg`…`work-3.svg`, `material-steel.svg`, `material-wood.svg`, `material-leather.svg`, `forge-video.svg`
- Test: `src/data/products.test.js`, `src/lib/format.test.js`

**Interfaces:**
- Produces:
  - `products: Product[]` — `{ id, name, category, price, stock, materials, image, featured }` (spec tablosu). `image` kategorinin yer tutucusu: `/media/placeholder-<category>.svg`.
  - `CATEGORIES: { id: 'kitchen'|'outdoor'|'folding'|'care', label: string }[]` — sırayla Mutfak, Kamp ve av, Çakı, Bakım.
  - `categoryLabel(id) → string`
  - `works: { id, title, note, image }[]` (3), `materials: { id, name, description, image }[]` (3: çelik, sap ahşabı, kın derisi) — `showcase.js`.
  - `formatPrice(n: number) → string` — `formatPrice(2400) === '2.400 TL'` (`Intl.NumberFormat('tr-TR')` + `' TL'`).

- [ ] **Step 1: Failing tests** — `products.test.js`:
  - `'yasak bıçak türü içermez'`: hiçbir `name`/`materials` `/sustal|kelebek/i` ile eşleşmez.
  - `'her ürün geçerli'`: kategori `CATEGORIES` içinde, `price > 0` tam sayı, `stock >= 0` tam sayı, `image` `/media/` ile başlar.
  - `'id\'ler benzersiz'`, `'tam 3 ürün öne çıkar'`, `'8–10 ürün; her kategoride en az bir, en az bir tükenmiş'`.
  - `format.test.js`: `formatPrice(2400)` → `'2.400 TL'`, `formatPrice(950)` → `'950 TL'`.
  - showcase: `works.length === 3`, `materials.length === 3`.
- [ ] **Step 2:** `npx vitest run src/data src/lib` → FAIL.
- [ ] **Step 3: Implement.** 8–10 ürün (ör. şef bıçağı, santoku, ekmek bıçağı, kamp bıçağı, av bıçağı, katlanır çakı ×2, bileme taşı, bıçak yağı/kın). Öne çıkan 3'ü farklı kategorilerden, en az biri stokta. SVG'ler: koyu zemin üzerinde basit bıçak silueti/ikon ve küçük "Görsel yakında" yazısı; `--ember` rengi vurgu.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** — "Veri: ürünler, örnek işler, malzemeler ve yer tutucu görseller"

### Task 3: Katalog — ProductImage, ProductCard, CategoryFilter

**Files:**
- Create: `src/components/ProductImage.jsx`, `src/components/ProductCard.jsx`, `src/components/CategoryFilter.jsx`
- Modify: `src/pages/Catalog.jsx`, `src/index.css`
- Test: `src/components/ProductCard.test.jsx`, `src/pages/Catalog.test.jsx`

**Interfaces:**
- Consumes: `products`, `CATEGORIES`, `formatPrice` (Görev 2).
- Produces:
  - `ProductImage({ product })` → `<img src={product.image} alt={product.name} loading="lazy">`.
  - `ProductCard({ product, onOrder, onNotify })` — `<article>`; `h3` ad, malzeme, fiyat, stok metni ("Stokta: N" / "Tükendi"); `stock > 0` ise "Sipariş ver" düğmesi `onOrder(product)`, değilse "Gelince haber ver" `onNotify(product)`.
  - `CategoryFilter({ value, onChange })` — `value: 'all' | categoryId`; "Tümü" + kategori etiketleri; seçili düğmede `aria-pressed="true"`.
  - `Catalog` durumu: `category` (`'all'` başlangıç). `onOrder`/`onNotify` bu görevde Catalog'un `open(kind, product)` fonksiyonuna bağlanır; Görev 6 bunu pencereye bağlar (şimdilik `active` durumunu tutar, bir şey göstermez).

- [ ] **Step 1: Failing tests**
  - ProductCard: `'stoktaki ürün fiyatı ve Sipariş ver düğmesini gösterir'` (stock 2, price 2400 → "2.400 TL", "Stokta: 2", tıklayınca `onOrder` ürünle çağrılır); `'tükenen ürün Gelince haber ver gösterir'` ("Tükendi", `onNotify` çağrılır, "Sipariş ver" yok).
  - Catalog (`renderAt('/katalog')`): `'başta tüm ürünler listelenir'` (`getAllByRole('article').length === products.length`); `'süzgeç yalnızca seçili kategoriyi gösterir'` ("Çakı" tıklanınca kart sayısı = folding ürün sayısı, "Çakı" `aria-pressed="true"`).
- [ ] **Step 2:** `npx vitest run src/components src/pages` → FAIL.
- [ ] **Step 3: Implement** bileşenleri ve ızgara stilini (`grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))`).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** — "Katalog: ürün kartı, kategori süzgeci, fiyat ve stok"

### Task 4: Ana sayfa — beş bölüm

**Files:**
- Modify: `src/pages/Home.jsx`, `src/index.css`
- Test: `src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: `products` (`featured`), `works`, `materials`, `ProductCard`, `ProductImage`.
- Produces: `Home` öne çıkan ürünlerin `onOrder`/`onNotify`'ını kendi `open(kind, product)`'ına bağlar (Görev 6 pencereyi ekler).

- [ ] **Step 1: Failing tests** (`renderAt('/')`):
  - `'beş bölüm görünür'`: h1 "Black Ember"; h2'ler "Hikâye", "Örnek ürünler", "Örnek işler", "Malzemeler".
  - `'yapım videosu yer tutucusu var'`: `getByRole('img', { name: 'Yapım videosu yakında' })`.
  - `'hikâye dört adımı ve su vermeyi açıklar'`: "Ocak", "Örs", "Su verme", "Bileme" metinleri; `/suya ya da yağa daldırıp sertleştirmek/`.
  - `'3 öne çıkan ürün ve 3 örnek iş'`: "Örnek ürünler" bölümünde 3 `article`; "Örnek işler" bölümünde 3 öğe; `'Tüm katalog'` bağlantısı `/katalog`'a.
  - `'Kataloğa bak bağlantısı'` href `/katalog`.
- [ ] **Step 2:** `npx vitest run src/pages/Home.test.jsx` → FAIL.
- [ ] **Step 3: Implement.** Açılış: `forge-video.svg` `<img alt="Yapım videosu yakında">` (video gelince `<video muted loop autoplay playsInline>` ile değişecek), başlık, kısa cümle, "Kataloğa bak". Hikâye metni Görev 1'deki paragrafı içerir; dört adım listesi. Bölümler `<section aria-labelledby>` ile.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** — "Ana sayfa: açılış, hikâye, örnek ürünler, örnek işler ve malzemeler"

### Task 5: Webhook altyapısı ve doğrulama

**Files:**
- Create: `src/lib/webhook.js`, `src/lib/validation.js`, `.env.example`
- Test: `src/lib/webhook.test.js`, `src/lib/validation.test.js`

**Interfaces:**
- Produces:
  - `SOURCE = 'black-ember-katalog'`
  - `orderPayload({ product, name, phone, email, quantity }) → { event: 'order', name, productId, productName, phone, email, quantity, source }` (`productId = product.id`, `productName = product.name`, `name`/`email` kırpılmış, `quantity` sayı).
  - `notifyPayload({ product, name, email }) → { event: 'stock_notification', name, productId, productName, email, source }`.
  - `sendWebhook(payload, url = import.meta.env.VITE_WEBHOOK_URL) → Promise<void>` — `url` yoksa `Error('WEBHOOK_URL_MISSING')` fırlatır; `fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(payload) })`.
  - `validateOrder({ name, phone, email, quantity, adult, consent }, stock) → errors` ve `validateNotify({ name, email, consent }) → errors` — `errors` alan → Türkçe mesaj nesnesi; boşsa geçerli. Mesajlar: `name` "Adınızı yazın.", `email` "Geçerli bir e-posta yazın.", `phone` "Geçerli bir telefon numarası yazın.", `quantity` "Adet 1 ile N arasında olmalı." (N = stok), `adult` "Sipariş için 18 yaşından büyük olmalısınız.", `consent` "KVKK metnini onaylayın."

- [ ] **Step 1: Failing tests**
  - webhook: `orderPayload` ve `notifyPayload` çıktıları `toEqual` ile tam nesne (fazla alan yok; test verisi Global Constraints'teki gibi); `sendWebhook(p, undefined)` → `rejects.toThrow('WEBHOOK_URL_MISSING')`; `sendWebhook(p, 'https://ornek.test')` → `fetch` (vi.fn) yukarıdaki seçenekler ve `JSON.stringify(p)` ile çağrılır.
  - validation: geçerli siparişte `{}`; ad `'   '` → `name`; `quantity` `''`, `'0'`, `'1.5'`, `'3'` (stok 2) → `quantity` "Adet 1 ile 2 arasında olmalı."; `phone` `'+90 500 000 00 00'` ve `'(0500) 000-00-00'` geçerli, `'123'` geçersiz; `email` `'test@ornek'` geçersiz; `adult: false` → `adult`; `consent: false` → `consent`. `validateNotify` için ad/e-posta/onay.
- [ ] **Step 2:** `npx vitest run src/lib` → FAIL.
- [ ] **Step 3: Implement.** Telefon kuralı: `[\s\-.()]` atıldıktan sonra `/^\+?\d{10,13}$/`. E-posta: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Adet: `/^\d+$/` ve `1 ≤ n ≤ stock`. `.env.example`: açıklama satırı + `VITE_WEBHOOK_URL=` (`.env.local` zaten `*.local` ile git dışı).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** — "Webhook altyapısı: sipariş ve stok bildirimi verisi, doğrulama"

### Task 6: Formlar, pencere ve Gizlilik/KVKK metinleri

CLAUDE.md gereği kişisel veri toplayan formlar ve yasal metinler **aynı commit**'te.

**Files:**
- Create: `src/components/OrderForm.jsx`, `src/components/NotifyForm.jsx`, `src/components/ProductDialog.jsx`, `src/components/useProductDialog.js`
- Modify: `src/pages/Catalog.jsx`, `src/pages/Home.jsx`, `src/pages/Privacy.jsx`, `src/pages/Kvkk.jsx`, `src/index.css`
- Test: `src/components/OrderForm.test.jsx`, `src/components/NotifyForm.test.jsx`, `src/pages/Catalog.test.jsx` (ek), `src/pages/Legal.test.jsx`

**Interfaces:**
- Consumes: `orderPayload`, `notifyPayload`, `sendWebhook`, `validateOrder`, `validateNotify` (Görev 5); `ProductCard` (Görev 3).
- Produces:
  - `useProductDialog() → { active: { kind: 'order'|'notify', product } | null, open(kind, product), close() }` — Görev 3/4'teki geçici `open`'ların yerini alır.
  - `ProductDialog({ active, onClose })` — `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ürün adı başlığına; "Kapat" düğmesi ve Escape → `onClose`; `kind`'a göre `OrderForm` / `NotifyForm`'u `key={kind + product.id}` ile render eder (ürün değişince form sıfırlanır).
  - `OrderForm({ product, send = sendWebhook })` / `NotifyForm({ product, send = sendWebhook })` — `send` test için enjekte edilir.

- [ ] **Step 1: Failing tests**
  - OrderForm: `'onaylar işaretlenmeden gönderilmez'` (alanlar dolu, kutular boş → `send` çağrılmaz, "Sipariş için 18 yaşından büyük olmalısınız." ve "KVKK metnini onaylayın." görünür); `'stoğu aşan adet reddedilir'`; `'geçerli girişte webhook\'a doğru veri gider'` (`send` `orderPayload(...)` ile tam bir kez çağrılır, ardından "Siparişiniz alındı" metni); `'çift tıklama tek istek gönderir'` (`send` çözülmeyen promise döner, iki tık → bir çağrı, düğme `disabled`); `'gönderim hatasında mesaj çıkar, alanlar korunur'` (`send` reject → "Gönderilemedi, lütfen tekrar deneyin.", ad alanı hâlâ "Test Kullanıcı"); "Sipariş 18 yaş ve üzeri içindir." formda görünür; KVKK bağlantısı `/kvkk`.
  - NotifyForm: telefon/adet alanı yok; geçerli girişte `notifyPayload(...)` ile çağrı; başarıda "Ürün gelince size haber vereceğiz" metni.
  - Catalog (ek): `'Sipariş ver penceresi açar, Escape kapatır'`; `'başka ürün açılınca form sıfırlanır'` (A'da ada yaz → kapat → B'yi aç → başlık B, ad alanı boş); tükenen üründe "Gelince haber ver" → NotifyForm.
  - Legal (`renderAt('/gizlilik')`, `renderAt('/kvkk')`): her iki metin "ad", "e-posta", "telefon", "adet" verilerini ve webhook ile iletildiğini anar; KVKK metni veri sorumlusu, amaç, hukuki sebep ve haklar başlıklarını içerir.
- [ ] **Step 2:** `npm test` → yeni testler FAIL.
- [ ] **Step 3: Implement** hook, pencere, formlar (gönderimde `status: 'idle'|'sending'|'sent'|'error'`; `sending` iken düğme pasif ve ikinci gönderim yok sayılır) ve Catalog/Home bağlantısı.
- [ ] **Step 4: Yasal metinler.** `Privacy`: toplanan veriler, amaç (sipariş/stok bildirimi), iletim (webhook), saklama, iletişim; son güncelleme 2026-10-29. `Kvkk`: veri sorumlusu (Black Ember — hayali atölye; gerçek kişi adı yok), işlenen veriler, amaç, hukuki sebep (sözleşmenin kurulması, açık rıza), aktarım, KVKK md. 11 hakları, başvuru yolu.
- [ ] **Step 5:** `npm test` ve `npm run build` → PASS.
- [ ] **Step 6: Elle kontrol.** `npm run dev`; `/katalog`'da sipariş ve haber verme pencerelerini aç; `.env.local` yokken gönderimde hata mesajı görünür.
- [ ] **Step 7: Commit** — "Sipariş ver ve Gelince haber ver formları; Gizlilik ve KVKK metinleri"
