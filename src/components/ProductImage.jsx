export default function ProductImage({ product }) {
  return <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
}
