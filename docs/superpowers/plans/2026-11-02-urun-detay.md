# Ürün detay sayfası — uygulama planı

Tasarım: [`../specs/2026-11-02-urun-detay-design.md`](../specs/2026-11-02-urun-detay-design.md). Her adım ayrı commit; commit'ten önce `npm test`.

1. **Veri** — 9 ürüne `slug`, `description`, `story`, `specs`, `care`, `material`; `findProductBySlug`. Veri testleri.
2. **Detay sayfası** — `ProductPage`, `OrderBar`, `/katalog/:slug` rotası, stiller. Sayfa testleri.
3. **Bağlantılar** — katalog kartı ve ana sayfa sahnesinden detaya. Bağlantı testleri.
4. **README, skill ve son kontrol** — sayfalar tablosu; `npm run build`; tarayıcıda masaüstü ve dar ekran.
