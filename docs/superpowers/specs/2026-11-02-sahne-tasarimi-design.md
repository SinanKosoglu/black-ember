# Sahne tasarımı — Black Ember yeniden tasarım

Tarih: 2026-11-02 · Durum: onaylandı

## Amaç

Siteyi, kullanıcının örnek gösterdiği sen-knife (Awwwards, 2026) sitesinin havasına taşımak: ekranı kaplayan ürün sahneleri, çapraz bıçak ve ikiye bölünmüş iri başlık, kaydırma ilerlemesini gösteren menü çizgisi. **Esinlenme, kopya değil:** düzen fikri alınır; metin, görsel ve marka alınmaz. Black Ember'in koyu "kara kor" kimliği korunur.

## Kararlar (kullanıcıyla)

| Konu | Karar |
|---|---|
| Renk | Koyu kalır: kömür siyahı zemin, kırık beyaz yazı, kor turuncusu yalnızca küçük vurgularda |
| Ürün düzeni | Karma: ana sayfada 3 öne çıkan ürün ekran boyu sahne; katalog ızgara kalır |
| Animasyon | Sade, kütüphanesiz; "hareketi azalt" açıksa kapanır |
| 3D | Denendi (`spike/3d-bicak`), kod ile çizilen model oyuncak gibi durdu; dal silindi. Gerçek bir `.glb` model gelince yeniden açılır |
| Görseller | Unsplash'ten ücretsiz fotoğraflar (Unsplash lisansı). Eniştenin bıçaklarının fotoğrafları gelince ürünlerde onlar kullanılır |
| Açılış görseli | Koyu zeminde çapraz duran bıçak |
| Dövme fotoğrafı | Sahneler ile hikâye arasında tam genişlikte banner |
| Yazı tipi | Jost (ücretsiz, Türkçe harfler tam), `@fontsource-variable/jost` ile projeye gömülü; dışarıya istek yok |

## Sayfa yapısı

**Üst menü (her sayfa):** solda `BLACK EMBER`, sağda Ana sayfa · Katalog · Hikâye bağlantıları ve dolu, yuvarlak "Katalog" düğmesi. Altında noktalı çizgi; kaydırdıkça kor turuncusu bir çizgi soldan uzar (CSS `animation-timeline: scroll()`, desteklemeyen tarayıcıda görünmez). Menü sabit ve saydam; altındaki içerik görünür.

**Ana sayfa:**

1. **Açılış** — tam ekran bıçak fotoğrafı, üstünde koyu degrade. `h1` iki parçaya bölünür: "Black" üstte solda, "Ember" altta sağda. Yanında iki satır: "Her bıçak ocakta ısıtılır, örste dövülür, elde bilenir." Sağ altta "Kaydır", sol altta `[01] — [04]` sayacı.
2. **Öne çıkan 3 ürün** (`FeaturedScene`) — her biri ekran boyu, yapışkan (`position: sticky`) sahne; bir sonraki öncekinin üstüne gelir. Sahne görünür olunca fotoğraf dikey şeritler halinde açılır (`IntersectionObserver` + CSS maske). İçerik: büyük, ikiye bölünmüş ürün adı (`h2`), kısa açıklama, malzeme, fiyat, stok, "Sipariş ver" / "Gelince haber ver", sayaç `[02]`–`[04]`.
3. **Dövme bannerı** — tam genişlik çekiç ve kızgın çelik fotoğrafı; kaydırırken görsel yavaş kayar (CSS `view()` zaman çizelgesi). Üzerinde: "Her bıçak örste, tek tek dövülür."
4. **Hikâye** — giriş paragrafı, `[01] Ocak` … `[04] Bileme`.
5. **Örnek işler** ve **Malzemeler** — fotoğraflı satırlar, ince çizgilerle ayrılır.
6. **Kapanış** — "Sipariş ya da soru için" iri çağrı ve kataloğa bağlantı.

Bölümler kaydırınca yumuşakça belirir (`Reveal`).

**Katalog:** başlık, süzgeç, ızgara; aynı yazı tipi ve çizgiler. Fotoğraf üstüne gelince hafifçe yakınlaşır. Formlar, süzgeç, QR değişmez.

**Alt bilgi:** büyük `BLACK EMBER`, 18 yaş notu, yasal bağlantılar ve "Fotoğraflar temsilidir." notu.

## Veri

- `products.js`: öne çıkan 3 ürüne isteğe bağlı `description` (iki satırlık metin). Görseller kategori başına bir fotoğraf (`/media/category-<id>.webp`).
- `showcase.js`: görsel yolları `.webp`.
- Webhook veri biçimi **değişmez**.

## Görsel kaynakları

`public/media/` altında WebP; fotoğrafçılar README'deki "Görsel kaynakları" tablosunda. Yüz yok, marka logosu yok; kelebek bıçak ve yaylı açılan çakı içeren adaylar elendi.

## Erişilebilirlik ve hareket

- `prefers-reduced-motion: reduce` → şerit açılışı, kayma, belirme ve yapışkan sahneler kapanır; sahneler alt alta dizilir.
- `IntersectionObserver` yoksa (ör. test ortamı) içerik doğrudan görünür.
- Her fotoğrafın Türkçe alternatif metni var; yalnızca süs olan banner arka planı `alt=""`.
- Metin fotoğraf üstündeyse koyu degrade ile kontrast sağlanır.

## Testler

- Mevcut testler korunur; ana sayfa testi "3 article" yerine 3 öne çıkan sahneyi (`region`, ürün adıyla) arar.
- Yeni: öne çıkan sahnede düğme penceresi açar; banner ve kapanış görünür; menüde "Katalog" düğmesi; alt bilgide "Fotoğraflar temsilidir."; veri testinde öne çıkan ürünlerin `description`'ı var ve bütün görseller `.webp`.

## Kapsam dışı

3D model, video, ürün başına ayrı sayfa, ürün başına ayrı fotoğraf (gerçek fotoğraflar gelince).
