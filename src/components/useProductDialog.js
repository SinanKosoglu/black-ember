import { useState } from 'react'

export default function useProductDialog() {
  const [active, setActive] = useState(null)
  const open = (kind, product) => setActive({ kind, product })
  const close = () => setActive(null)
  return { active, open, close }
}
