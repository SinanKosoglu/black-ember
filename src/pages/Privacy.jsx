import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <>
      <h1>Gizlilik Politikası</h1>
      <p>Son güncelleme: 2026-10-29</p>
      <p>
        Black Ember, hayali bir demirci atölyesidir. Bu sayfa, sitedeki formlar aracılığıyla hangi
        bilgilerin toplandığını ve nasıl kullanıldığını anlatır.
      </p>

      <h2>Toplanan veriler</h2>
      <p>Sipariş formunda ad soyad, e-posta, telefon ve adet bilgisi istenir. "Gelince haber ver" formunda yalnızca ad soyad ve e-posta istenir. Seçtiğiniz ürünün adı da kaydedilir.</p>

      <h2>Kullanım amacı</h2>
      <p>Bilgileriniz yalnızca siparişinizi almak ve tükenen bir ürün yeniden yapıldığında size haber vermek için kullanılır.</p>

      <h2>Verilerin iletilmesi</h2>
      <p>
        Formu gönderdiğinizde bilgileriniz bir webhook aracılığıyla atölyenin kendi kayıt sayfasına
        iletilir. Sitenin kendi sunucusu ya da veritabanı yoktur; tarayıcınızda da bu bilgiler saklanmaz.
        Verileriniz reklam ya da analiz amacıyla kullanılmaz.
      </p>

      <h2>Saklama</h2>
      <p>Bilgiler, sipariş ya da bildirim işlemi tamamlanana kadar, ardından yasal yükümlülükler gerektirdiği sürece saklanır.</p>

      <h2>İletişim</h2>
      <p>
        Sorularınız için: iletisim@ornek.com (örnek adres). Ayrıntılı bilgi için{' '}
        <Link to="/kvkk">KVKK Aydınlatma Metni</Link>'ne bakabilirsiniz.
      </p>
    </>
  )
}
