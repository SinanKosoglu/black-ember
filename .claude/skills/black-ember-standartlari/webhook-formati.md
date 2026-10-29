# Webhook veri biçimi

Sitenin dışarı gönderdiği her verinin tek kaynağı. Kod: `src/lib/webhook.js` (veri) ve `src/lib/validation.js` (doğrulama). Dinleyen taraf (webhook.site, ileride n8n vb.) bu biçime güvenir.

## Sözleşme

Alan adları ödevin veri sözleşmesinden gelir: İngilizce, düz yapı, fazladan alan yok (veri en aza indirme).

| Alan | `order` | `stock_notification` | Örnek |
|---|:-:|:-:|---|
| `event` | ✓ | ✓ | `"order"` |
| `name` | ✓ | ✓ | `"Test Kullanıcı"` (kırpılmış) |
| `productId` | ✓ | ✓ | `"chef-knife"` (`product.id`) |
| `productName` | ✓ | ✓ | `"Şef bıçağı"` (`product.name`) |
| `phone` | ✓ | | `"0500 000 00 00"` (yazıldığı gibi, uçları kırpılmış) |
| `email` | ✓ | ✓ | `"test@ornek.com"` (kırpılmış) |
| `quantity` | ✓ | | `2` (sayı) |
| `source` | ✓ | ✓ | `"black-ember-katalog"` (`SOURCE`) |

Veriyi yalnızca `orderPayload(...)` ve `notifyPayload(...)` üretir; elle nesne kurma.

```json
{ "event": "order", "name": "Test Kullanıcı", "productId": "chef-knife", "productName": "Şef bıçağı",
  "phone": "0500 000 00 00", "email": "test@ornek.com", "quantity": 2, "source": "black-ember-katalog" }
```

```json
{ "event": "stock_notification", "name": "Test Kullanıcı", "productId": "santoku", "productName": "Santoku",
  "email": "test@ornek.com", "source": "black-ember-katalog" }
```

## Doğrulama

`validateOrder(values, stock)` / `validateNotify(values)` → alan → Türkçe mesaj; boş nesne geçerli demek.

- Ad: boşluklar atılınca boş olamaz.
- E-posta: `a@b.c` biçimi.
- Telefon: boşluk, tire, nokta, parantez atılınca `+` ile ya da `+`sız 10–13 rakam.
- Adet: yalnızca rakam, 1 ile `stock` arası.
- `adult` (18+) ve `consent` (KVKK) kutuları işaretli olmalı; bildirimde yalnızca `consent`.

## Gönderim

- Adres yalnızca `import.meta.env.VITE_WEBHOOK_URL` (`.env.local`; depoda `.env.example`; Vercel'de ortam değişkeni). Kodda adres yazılmaz.
- `fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(payload) })`. webhook.site CORS izni vermediği için `no-cors`; yanıt okunamaz, yalnızca ağ hatası yakalanır. Adres yoksa `Error('WEBHOOK_URL_MISSING')`.

## Yeni tür eklemek

1. `webhook.js`'e `xPayload({ product, ... })`; `event`, `productId`, `productName`, `source`'u aynı biçimde kur.
2. Bu dosyadaki tabloya ve örneklere ekle.
3. `webhook.test.js`'e `toEqual` ile biçim testi (fazla alan olmasın), formun testine "webhook'a doğru veri gider" testi.
4. Yeni bir kişisel veri topluyorsa Gizlilik ve KVKK metinlerinde (işlenen veriler, amaç, hukuki sebep, aktarım) aynı commit'te yaz.
