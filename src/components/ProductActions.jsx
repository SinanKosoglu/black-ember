// Stok kuralı tek yerde: stokta olan ürün "Sipariş ver", tükenen ürün "Gelince haber ver" gösterir.
export default function ProductActions({ product, onOrder, onNotify }) {
  const inStock = product.stock > 0

  return (
    <>
      <p className={inStock ? 'product-stock' : 'product-stock sold-out'}>
        {inStock ? `Stokta: ${product.stock}` : 'Tükendi'}
      </p>
      {inStock ? (
        <button type="button" onClick={() => onOrder(product)}>
          Sipariş ver
        </button>
      ) : (
        <button type="button" className="secondary" onClick={() => onNotify(product)}>
          Gelince haber ver
        </button>
      )}
    </>
  )
}
