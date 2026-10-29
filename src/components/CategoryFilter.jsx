import { CATEGORIES } from '../data/products'

const OPTIONS = [{ id: 'all', label: 'Tümü' }, ...CATEGORIES]

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Kategori">
      {OPTIONS.map(option => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
