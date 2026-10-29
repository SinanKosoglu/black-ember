# Black Ember — site tasarımı

Tarih: 2026-10-29 · Durum: onaylandı (sohbette), yazılı belge incelemede

## Amaç

AtölyeKart ödevi için Black Ember bıçak atölyesinin sitesi. Ziyaretçi atölyeyi tanır, kataloğa bakar, stoktaki bıçağı sipariş eder ya da tükenmiş olanın geri gelince haber verilmesini ister. Başarı: bu üç akış çalışır, testler geçer, her adım git geçmişinde ayrı bir Türkçe commit olarak görünür.

## Kapsam ve kısıtlar

- Yalnızca Türkçe; dil seçici yok. Kod içi adlar İngilizce.
- Sunucu ve veritabanı yok. Formlar webhook'a gönderir.
- Sustalı, kelebek ve benzeri yasak türler katalogda yok. Çakılar elle açılan katlanır bıçaklardır.
- Sipariş 18 yaş ve üzeri içindir; bu koşul sipariş formunda ve alt bilgide görünür.
- Görseller ve video şimdilik **yer tutucu** (SVG / CSS); ücretli üretim yapılmaz. Gerçek görseller sonra ayrı commit'le gelir. Gerçek kişi adı ya da fotoğrafı kullanılmaz.
- Ekstra özellik yok: aşağıda olmayan şey yapılmaz.

## Sayfalar

Her sayfada `Header` (BLACK EMBER · Ana sayfa · Katalog) ve `Footer` (atölye adı, "Sipariş 18 yaş ve üzeri içindir.", Gizlilik ve KVKK bağlantıları). Sayfa değişince en üstten başlanır.

### Ana sayfa `/` — `Home`

Yukarıdan aşağı bölümler:

1. **Açılış:** yapım videosu alanı (şimdilik durağan yer tutucu kare; video gelince sessiz, döngüde), "Black Ember" başlığı, kısa cümle, "Kataloğa bak" bağlantısı.
2. **Hikâye:** dört adım — Ocak → Örs → Su verme → Bileme. Her adımda bir-iki cümle; terimler kısaca açıklanır (ör. "su verme: kızgın çeliği suya ya da yağa daldırıp sertleştirmek"). Mevcut `App.jsx` metni buraya taşınır.
3. **Örnek ürünler:** katalogdan öne çıkarılmış 3 ürün, `ProductCard` ile (fiyat ve stok görünür, düğmeler katalogdakiyle aynı çalışır); altında "Tüm katalog" bağlantısı.
4. **Örnek işler:** satışta olmayan 3 özel yapım iş; her biri görsel + kısa not.
5. **Malzemeler:** çelik, sap ahşabı, kın derisi; her biri görsel + bir-iki cümle.

### Katalog `/katalog` — `Catalog`

- Kategori süzgeci (`CategoryFilter`): Tümü · Mutfak · Kamp ve av · Çakı · Bakım.
- Ürün ızgarası: her ürün bir `ProductCard`.
- `ProductCard`: görsel (`ProductImage`), ad, malzeme özeti, fiyat ("2.400 TL" biçiminde), stok ("Stokta: 2" ya da "Tükendi"), düğme: stokta ise **Sipariş ver**, tükenmişse **Gelince haber ver**.
- Düğme bir pencere açar: `OrderForm` ya da `NotifyForm`.

### Gizlilik `/gizlilik` — `Privacy` ve KVKK `/kvkk` — `Kvkk`

Düz metin sayfaları. Formların topladığı verileri (ad, e-posta, telefon, adet), amacı ve saklama biçimini anlatır. Formlar bu sayfalara bağlantı verir. Formlarla aynı işte yazılır.

## Görünüm

Koyu kömür zemin, kor turuncusu vurgu, çelik grisi ikincil metin. Mevcut `src/index.css` renk değişkenleri (`--bg`, `--surface`, `--text`, `--muted`, `--ember`, `--line`) korunur ve genişletilir. Telefon genişliğinde tek sütun.

## Yapı

```
src/
  data/products.js      ürünler
  data/showcase.js      örnek işler ve malzemeler
  components/           Header, Footer, ProductCard, ProductImage,
                        CategoryFilter, OrderForm, NotifyForm
  pages/                Home, Catalog, Privacy, Kvkk
  lib/webhook.js        orderPayload(), notifyPayload(), sendWebhook()
public/media/           yer tutucu görseller
```

Yönlendirme: `react-router-dom` (`BrowserRouter`). Vercel için tüm yolları `index.html`'e yönlendiren `vercel.json` yayın adımında eklenir.

## Veri

`products.js` her ürün için:

| Alan | Örnek | Not |
|---|---|---|
| `id` | `"chef-knife"` | benzersiz, URL'ye uygun |
| `name` | `"Şef bıçağı"` | |
| `category` | `"kitchen"` | `kitchen` \| `outdoor` \| `folding` \| `care` |
| `price` | `2400` | TL, tam sayı |
| `stock` | `2` | `0` = tükendi |
| `materials` | `"Karbon çeliği, ceviz sap"` | kart üzerindeki özet |
| `image` | `"/media/chef-knife.svg"` | yer tutucu |
| `featured` | `true` | ana sayfadaki 3 ürün |

Kategori etiketleri (Mutfak, Kamp ve av, Çakı, Bakım) bileşende değil tek bir eşlemede tutulur. Başlangıçta 8–10 ürün; en az biri tükenmiş, her kategoride en az biri.

`showcase.js`: `works` (3 öğe: başlık, not, görsel) ve `materials` (3 öğe: ad, açıklama, görsel).

## Veri akışı ve webhook

- `Catalog` seçili kategoriyi ve açık formu (hangi ürün, hangi tür) tutar. `ProductCard` durumu değiştirmez; `onOrder(product)` / `onNotify(product)` ile yukarı bildirir. Ana sayfadaki örnek ürünler de aynı formları açar.
- Formlar doğrulamadan geçince `lib/webhook.js` veriyi `import.meta.env.VITE_WEBHOOK_URL` adresine POST eder. Adres yalnızca `.env.local`'da; depoda `.env.example`.
- Veri sözleşmesi (ödevden; düz yapı, fazladan alan yok):

| Alan | Sipariş (`order`) | Bildirim (`stock_notification`) |
|---|:-:|:-:|
| `event` | ✓ | ✓ |
| `name` | ✓ | ✓ |
| `productId` | ✓ | ✓ |
| `productName` | ✓ | ✓ |
| `phone` | ✓ | |
| `email` | ✓ | ✓ |
| `quantity` | ✓ | |
| `source` | ✓ (`"black-ember-katalog"`) | ✓ |

- Gönderim: `fetch`, `method: "POST"`, `mode: "no-cors"`, `Content-Type: text/plain;charset=UTF-8`, gövde `JSON.stringify(...)` (webhook.site CORS izni vermez). Bu kipte yalnızca ağ hatası yakalanır.

## Formlar ve hata durumları

**OrderForm:** ad, e-posta, telefon, adet, "18 yaşından büyüğüm" kutusu, KVKK onay kutusu (KVKK metnine bağlantılı).
**NotifyForm:** ad, e-posta, KVKK onay kutusu.

- Ad boş olamaz; e-posta `a@b.c` biçiminde; telefon boşluk/tire/nokta/parantez atılınca 10–13 rakam (başta `+` olabilir); adet 1 ile ürünün stoğu arası tam sayı.
- 18+ ve KVKK kutuları işaretlenmeden gönderilmez; eksik alanın yanında Türkçe uyarı görünür.
- Webhook adresi yoksa ya da ağ hatası olursa form "Gönderilemedi, lütfen tekrar deneyin." der; girilen bilgiler silinmez.
- Başarılı gönderimde teşekkür mesajı ve pencereyi kapatma düğmesi.

## Testler

Vitest + Testing Library. Test verisinde gerçek kişi bilgisi yok: "Test Kullanıcı", `0500 000 00 00`, `test@ornek.com`.

- **Veri:** yasak tür yok (ad/kategoride sustalı, kelebek); her üründe geçerli kategori, pozitif fiyat, negatif olmayan stok; tam 3 `featured`; `id`'ler benzersiz.
- **Webhook:** `orderPayload` / `notifyPayload` tam olarak sözleşmedeki alanları üretir (`toEqual`); adres yoksa `sendWebhook` hata fırlatır.
- **ProductCard:** fiyat biçimi; stokta → "Sipariş ver", tükenmiş → "Gelince haber ver".
- **Catalog:** süzgeç yalnızca seçili kategoriyi gösterir; düğme doğru formu açar.
- **Formlar:** onaylar işaretlenmeden gönderim yok; stoğu aşan adet reddedilir; geçerli girişte webhook'a doğru veri gider (`fetch` sahte); hata durumunda mesaj çıkar, alanlar korunur.
- **Home:** beş bölüm başlığı görünür. **Yönlendirme:** menü bağlantıları doğru sayfayı açar; alt bilgide 18+ notu ve yasal bağlantılar var.

## Uygulama sırası (her biri ayrı commit)

1. Site iskeleti: yönlendirme, `Header`, `Footer`, boş sayfalar, en üste kaydırma.
2. Veri modeli: `products.js`, `showcase.js`, yer tutucu görseller.
3. Katalog: `ProductImage`, `ProductCard`, `CategoryFilter`, `Catalog`.
4. Ana sayfa: beş bölüm.
5. Webhook altyapısı: `lib/webhook.js`, `.env.example`.
6. Formlar + Gizlilik/KVKK metinleri (aynı iş).

Sonraki adımlar (proje skill'i, QR kodu, README, GitHub, Vercel) ayrı planlarda.
