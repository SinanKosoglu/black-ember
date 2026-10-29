import { QRCodeSVG } from 'qrcode.react'

// Kataloğu telefonda açmak için sayfanın adresini QR kodu olarak gösterir.
export default function CatalogQr({ url }) {
  return (
    <figure className="catalog-qr">
      <QRCodeSVG
        value={url}
        size={112}
        bgColor="#ece6df"
        fgColor="#141210"
        marginSize={2}
        role="img"
        aria-label="Katalog QR kodu"
      />
      <figcaption>
        <p>Kataloğu telefonda açmak için okutun.</p>
        <p className="catalog-qr-url">{url}</p>
      </figcaption>
    </figure>
  )
}
