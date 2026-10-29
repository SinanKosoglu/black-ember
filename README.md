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
| `/` | Ana sayfa | Yapım videosu (şimdilik yer tutucu), atölyenin hikâyesi (ocak, örs, su verme, bileme), öne çıkan 3 ürün, 3 örnek iş, malzemeler |
| `/katalog` | Katalog | Kategori süzgeci, fiyat ve stoklu ürün kartları, sipariş ve haber verme formları, kataloğun QR kodu |
| `/gizlilik` | Gizlilik Politikası | Formların topladığı veriler ve nasıl iletildiği |
| `/kvkk` | KVKK Aydınlatma Metni | Veri sorumlusu, işlenen veriler, amaç, hukuki sebep, aktarım, haklar |

Görseller şimdilik `public/media/` altında SVG yer tutucu; gerçek fotoğraflar sonra eklenecek.

## Klasörler

```
src/
  pages/        sayfalar (Home, Catalog, Privacy, Kvkk)
  components/   Header, Footer, ProductCard, ProductImage, CategoryFilter,
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
