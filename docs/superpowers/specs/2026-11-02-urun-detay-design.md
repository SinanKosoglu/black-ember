# Ürün detay sayfası

Tarih: 2026-11-02 · Durum: onaylandı · Önceki: [sahne tasarımı](2026-11-02-sahne-tasarimi-design.md)

## Amaç

Referans sitedeki (sen-knife) ürün sayfası gibi, her bıçağın kendi sayfası olsun: arkada sabit fotoğraf, üzerinden kayan metin blokları, altta hep duran fiyat ve sipariş düğmesi. Bütün 9 ürün için aynı düzen.

## Adres

`/katalog/:slug` — Türkçe, küçük harf, tireli (`sef-bicagi`). Bilinmeyen slug → `/katalog`'a yönlenir.

## Veri (`products.js`)

Her ürüne eklenir:

| Alan | Örnek | Not |
|---|---|---|
| `slug` | `sef-bicagi` | benzersiz, `^[a-z0-9-]+$` |
| `description` | iki satırlık tanıtım | artık bütün ürünlerde |
| `story` | yapım paragrafı | bu bıçağa özel, zanaat terimleri açıklanır |
| `specs` | `['Ağız 20 cm', 'Toplam 33 cm', '190 g']` | hayali atölyeye uygun değerler |
| `care` | bakım cümlesi | |
| `material` | `steel` \| `wood` \| `leather` | ara fotoğraf için `showcase.materials` id'si |

Webhook verisi değişmez.

## Sayfa (`ProductPage`)

1. **Sabit arka plan:** ürünün fotoğrafı, koyu degrade.
2. **Açılış:** `[Kategori]` etiketi, ikiye bölünmüş `h1` ad, açıklama, "Kaydır".
3. **Yapım:** "Nasıl yapılır" etiketi, büyük harfli başlık "Ocakta dövüldü, elde bilendi.", `story`.
4. **Malzeme:** ara fotoğraf (malzeme görseli), `materials` ve `specs` listesi.
5. **Bakım:** `care`.
6. **Diğer bıçaklar:** aynı kategoriden önce, sonra diğerlerinden toplam 3 küçük bağlantılı kart.
7. **Sabit sipariş düğmesi (`OrderBar`):** "2.400 TL | Sipariş ver" ya da "Tükendi | Gelince haber ver". Stok kuralı `ProductActions`'tan; sayfa `useProductDialog` ile mevcut pencereyi açar.

Sekme başlığı: `<ad> · Black Ember`. Bloklar `Reveal` ile belirir; hareketi azalt açıksa kapanır.

## Bağlantılar

- Katalog kartında fotoğraf ve ad detay sayfasına gider; "Sipariş ver" kartta kalır.
- Ana sayfadaki her sahnede "Detay" bağlantısı.

## Testler

- Her ürünün sayfası `h1` adıyla açılır; sekme başlığı ayarlanır.
- Stoktaki üründe alttaki düğme sipariş penceresini, tükenmişte bildirim penceresini açar.
- Bilinmeyen slug kataloğa yönlenir.
- Katalog kartı ve ana sayfa sahnesi doğru adrese bağlanır; "Diğer bıçaklar" 3 kart, sayfanın kendi ürünü yok.
- Veri: yeni alanlar dolu, slug benzersiz ve biçimi doğru, `material` geçerli, metinlerde yasak tür yok.
