# Black Ember

El yapımı bıçak atölyesi Black Ember'ın web sitesi. Miuul "Vibe Code" eğitimindeki AtölyeKart ödevi için yapıldı: ziyaretçi ürün kataloğuna bakar, sipariş verir ve tükenen bir ürün geri geldiğinde haber almak ister.

Atölye hayalidir; gerçek bir bıçak ustasının işinden esinlenmiştir.

## Çalıştırma

[Node.js](https://nodejs.org) 20 veya üstü gerekir.

```
npm install        # bir kez: bağımlılıkları kurar
npm run dev        # geliştirme sunucusu: http://localhost:5173
npm test           # testler (Vitest + Testing Library)
npm run build      # yayına hazır dosyalar dist/ klasörüne
```

## Sayfalar

| Adres | Sayfa | İçerik |
|---|---|---|
| `/` | Ana sayfa | Tam ekran bıçaklı açılış, öne çıkan 3 ürünün ekran boyu sahneleri (kaydırınca şeritlerle açılır), dövme bannerı, hikâye (ocak, örs, su verme, bileme), 3 örnek iş, malzemeler, kapanış çağrısı |
| `/katalog` | Katalog | Kategori süzgeci ve ürün sayacı, fiyat ve stoklu ürün kartları, sipariş ve haber verme formları, kataloğun QR kodu |

**Tasarım:** sen-knife sitesinden (Awwwards, 2026) esinlenilen, koyu temalı "sahne" düzeni. Ayrıntılar: [`docs/superpowers/specs/2026-11-02-sahne-tasarimi-design.md`](docs/superpowers/specs/2026-11-02-sahne-tasarimi-design.md). Yazı tipi Jost, projeye gömülü. Animasyonlar kütüphanesiz (CSS ve IntersectionObserver); cihazda "hareketi azalt" açıksa kapanır.
| `/gizlilik` | Gizlilik Politikası | Formların topladığı veriler ve nasıl iletildiği |
| `/kvkk` | KVKK Aydınlatma Metni | Veri sorumlusu, işlenen veriler, amaç, hukuki sebep, aktarım, haklar |

Görseller `public/media/` altında, Unsplash'ten alınmış **temsili** fotoğraflar (WebP). Atölyenin kendi bıçaklarının fotoğrafları gelince ürünlerde onlar kullanılacak. Kaynaklar: [Görsel kaynakları](#görsel-kaynakları).

## Klasörler

```
src/
  pages/        sayfalar (Home, Catalog, Privacy, Kvkk)
  components/   Header, Footer, ProductCard, ProductActions, ProductImage,
                FeaturedScene, Reveal, useInView, CategoryFilter,
                ProductDialog, OrderForm, NotifyForm, CatalogQr
  data/         products.js (ürünler, kategoriler), showcase.js (örnek işler, malzemeler)
  lib/          format.js (fiyat), validation.js (form kontrolü), webhook.js (gönderim)
public/media/   görseller
.claude/skills/ proje skill'i: bileşen kalıpları ve webhook veri biçimi
docs/superpowers/  tasarım belgesi ve uygulama planı
```

## Ödevdeki bileşen adlarının karşılıkları

Kod içi adlar ödevdeki İngilizce adlarla aynı:

| Ödevdeki ad | Bu projede | Dosya | Ne gösterir |
|---|---|---|---|
| `ProductCard` | `ProductCard` | `src/components/ProductCard.jsx` | Ürünün görseli, adı, malzemesi, fiyatı, stok durumu ve "Sipariş ver" / "Gelince haber ver" düğmesi |
| `ProductList` (katalog) | `Catalog` | `src/pages/Catalog.jsx` | Süzgece uyan bütün ürün kartları |
| `ProductImage` | `ProductImage` | `src/components/ProductImage.jsx` | Ürünün görseli |

## Sipariş ve stok bildirimi (webhook)

- **Sipariş ver** (ürün stoktaysa): ad soyad, e-posta, telefon, adet, 18 yaş onayı ve KVKK onayı ister. Adet kalan stoğu aşamaz.
- **Gelince haber ver** (ürün tükendiyse): ad soyad, e-posta ve KVKK onayı ister.

Form gönderilince veri bir webhook adresine POST edilir. İki form aynı adrese gider; `event` alanı ayırır (`order`, `stock_notification`). Biçim, örnek JSON ve kurallar: [`.claude/skills/black-ember-standartlari/webhook-formati.md`](.claude/skills/black-ember-standartlari/webhook-formati.md).

**Kurulum:** `.env.example` dosyasını `.env.local` adıyla kopyala ve adresi yaz (ör. [webhook.site](https://webhook.site)'ın verdiği adres). `.env.local` GitHub'a gitmez. Adres değişince `npm run dev`'i yeniden başlat. Vercel'de aynı değişkeni proje ayarlarına `VITE_WEBHOOK_URL` olarak ekle.

**Elle deneme:** `npm run dev` → `/katalog` → stoktaki bir üründe **Sipariş ver**, tükenmiş bir üründe (ör. Santoku) **Gelince haber ver**. İstekler webhook.site sayfasında görünür. Gerçek bilgi yazma: webhook.site adresini bilen herkes içeriği görebilir.

## Testler

`npm test` bütün testleri çalıştırır. Neler denetleniyor:

- Veri: katalogda sustalı ya da kelebek bıçak yok; her ürünün kategorisi, fiyatı ve stoğu geçerli.
- Katalog: süzgeç, fiyat biçimi ("2.400 TL"), stoğa göre doğru düğme.
- Formlar: 18+ ve KVKK onayı olmadan gönderim yok; stoğu aşan adet reddedilir; çift tıklama tek istek gönderir; hata olursa yazılanlar silinmez.
- Webhook: giden veri tam olarak sözleşmedeki alanlardan oluşur.
- Sayfalar: menü, yönlendirme, ana sayfa bölümleri, yasal metinler.

Test verisinde gerçek kişi bilgisi kullanılmaz: "Test Kullanıcı", `0500 000 00 00`, `test@ornek.com`.

## GitHub ve MCP

Depo: [github.com/SinanKosoglu/black-ember](https://github.com/SinanKosoglu/black-ember). İlk yükleme `gh repo create ... --push` ile yapıldı (2026-10-29).

Claude Code'a GitHub'ın resmî MCP sunucusu bağlı. MCP (Model Context Protocol), Claude'un GitHub gibi dış servislerle kendi araçları üzerinden konuşmasını sağlar. Bağlantı `claude mcp list` ya da Claude Code içinde `/mcp` ile kontrol edilir; anahtar kullanıcının Claude Code ayarlarında durur, depoya girmez.

Bu bölüm, Claude'un MCP üzerinden doğrudan GitHub'a attığı commit'le eklendi (yerelde `git commit` / `git push` kullanılmadı). Değişiklik yerel kopyaya `git pull` ile alındı.

## Görsel kaynakları

Fotoğraflar [Unsplash Lisansı](https://unsplash.com/license) ile ücretsiz kullanılıyor; atıf zorunlu değil ama emeğe saygı için burada. Yüz ve marka logosu içeren, ayrıca kelebek bıçak ya da yaylı çakı gösteren adaylar seçilmedi.

| Dosya | Nerede | Fotoğrafçı | Kaynak |
|---|---|---|---|
| `hero-knife.webp` | Ana sayfa açılışı | Octavian-Dan Craciun | [unsplash.com/photos/yypwvERG6XM](https://unsplash.com/photos/yypwvERG6XM) |
| `forge-banner.webp` | Dövme bannerı | Martin Baron | [unsplash.com/photos/W6vcyRfkCZs](https://unsplash.com/photos/W6vcyRfkCZs) |
| `category-kitchen.webp` | Mutfak ürünleri | Blend Archive | [unsplash.com/photos/gzAqZM831kc](https://unsplash.com/photos/gzAqZM831kc) |
| `category-outdoor.webp` | Kamp ve av ürünleri | Ali Kazal | [unsplash.com/photos/QKCo0sBAm58](https://unsplash.com/photos/QKCo0sBAm58) |
| `category-folding.webp` | Çakılar | Hugo Carle | [unsplash.com/photos/FYJ4a9EdAY8](https://unsplash.com/photos/FYJ4a9EdAY8) |
| `category-care.webp` | Bakım ürünleri | Sander Hallaste | [unsplash.com/photos/4j_qFna2u4Y](https://unsplash.com/photos/4j_qFna2u4Y) |
| `work-1.webp` | Örnek iş: düğün seti | Andrey Matveev | [unsplash.com/photos/OtlyMBQC3ow](https://unsplash.com/photos/OtlyMBQC3ow) |
| `work-2.webp` | Örnek iş: Şam çeliği av bıçağı | True Knife | [unsplash.com/photos/e7A4f_gJvaI](https://unsplash.com/photos/e7A4f_gJvaI) |
| `work-3.webp` | Örnek iş: yenilenen satır | Nicholas Grande | [unsplash.com/photos/eE3SZ9Qd9Hw](https://unsplash.com/photos/eE3SZ9Qd9Hw) |
| `material-steel.webp` | Malzeme: çelik | Raul Barrios | [unsplash.com/photos/oTSyTtIvuBY](https://unsplash.com/photos/oTSyTtIvuBY) |
| `material-wood.webp` | Malzeme: sap ahşabı | The Cleveland Museum of Art | [unsplash.com/photos/KKKHaEA4coc](https://unsplash.com/photos/KKKHaEA4coc) |
| `material-leather.webp` | Malzeme: kın derisi | Felipe Santana | [unsplash.com/photos/xJkTCbtuqAY](https://unsplash.com/photos/xJkTCbtuqAY) |
