import useInView from './useInView'

// İçeriği kaydırınca yumuşakça belirtir. "Hareketi azalt" açıksa CSS animasyonu kapatır.
export default function Reveal({ children, className = '' }) {
  const [ref, inView] = useInView(0.15)
  return (
    <div ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
