import { useEffect, useRef, useState } from 'react'

// Öğe ekrana bir kez girince true olur. IntersectionObserver yoksa (eski tarayıcı, test) baştan true.
export default function useInView(threshold = 0.25) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (inView || !ref.current) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [inView, threshold])

  return [ref, inView]
}
