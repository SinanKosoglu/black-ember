# Black Ember — proje bağlamı

AtölyeKart ödevi: el yapımı ürün satan küçük bir atölyenin web sitesi. Ziyaretçi kataloğa bakar, sipariş verir, tükenen ürün geri gelince haber almak ister. Her hafta BizCard'da işlenen konu burada yeniden uygulanır.

## Atölye

- **Black Ember** ("kara kor"): el yapımı bıçak yapan küçük bir demirci atölyesi. Gerçek bir ustadan esinlenen **hayali** bir iş; gerçek kişi adı ya da fotoğrafı kullanılmaz.
- **Hikâye:** Her bıçak ocakta ısıtılır, örste dövülür, suya verilir, elde bilenir. Tek tek üretildiği için stok sınırlı; tükenen model yeniden yapılınca haber verilir. Slogan kullanılmaz.
- **Hedef kitle:** El emeğine değer veren yetişkinler: yemek yapmayı sevenler, kampçılar, hediye arayanlar. Dil sade ve samimi; zanaat terimleri (su verme, örs, kın) kullanılırsa kısaca açıklanır.
- **Kategoriler (öneri, veri modelinde kesinleşecek):** mutfak bıçakları, kamp ve av bıçakları, çakılar (katlanır), aksesuar ve bakım.

## Kurallar

- **Yasal:** Sustalı, kelebek ve benzeri yasak bıçak türleri katalogda yer almaz. Sipariş 18 yaş ve üzeri içindir; bu koşul sipariş akışında görünür.
- **Dil:** Kullanıcıya görünen metinler Türkçe. Kod içi adlar (bileşen, dosya, değişken) İngilizce; ödevdeki adlarla (ör. `ProductCard`) birebir aynı.
- **Test:** Davranış değiştiren her iş testle birlikte gelir; commit'ten önce `npm test` geçmeli.
- **Commit:** Hoca ilerlemeyi git geçmişinden izliyor. Her adım ayrı, Türkçe ve açıklayıcı bir commit.
- **Kişisel veri:** Site ad, e-posta ya da telefon toplamaya başladığında gizlilik ve KVKK metni aynı işte eklenir/güncellenir. Testlerde gerçek kişi bilgisi kullanılmaz.

## Teknik

- Vite + React. Sunucu ve veritabanı yok.
- Komutlar: `npm run dev`, `npm test` (Vitest + Testing Library), `npm run build`.
