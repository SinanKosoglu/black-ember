# Sahne tasarımı — uygulama planı

Tasarım: [`../specs/2026-11-02-sahne-tasarimi-design.md`](../specs/2026-11-02-sahne-tasarimi-design.md). Her adım ayrı commit; commit'ten önce `npm test` geçer.

1. **Gerçek fotoğraflar** — 12 Unsplash fotoğrafı WebP olarak `public/media/`'ya; `products.js` ve `showcase.js` yolları; eski SVG yer tutucular silinir; README'ye "Görsel kaynakları"; alt bilgiye "Fotoğraflar temsilidir." Test: bütün görseller `.webp`, alt bilgi notu.
2. **Görsel dil ve üst menü** — Jost fontu, renk değişkenleri, sabit saydam menü, noktalı ilerleme çizgisi, "Katalog" düğmesi, büyük alt bilgi; ana sayfa dışındaki sayfalar dar sütunda. Test: menü düğmesi, mevcut rota testleri.
3. **Ana sayfa sahneleri** — `useInView`, `Reveal`, `FeaturedScene`; açılış, banner, hikâye, işler, malzemeler, kapanış; `description` alanı. Test: sahneler, sahneden sipariş penceresi, banner, kapanış.
4. **Katalog** — ızgara, kart ve süzgecin yeni dile uyarlanması. Mevcut katalog testleri.
5. **README ve son kontrol** — sayfalar tablosu, klasörler; `npm run build`, tarayıcıda masaüstü ve dar ekran kontrolü.
