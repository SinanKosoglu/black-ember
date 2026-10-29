import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { products } from '../data/products'
import { renderAt } from '../test-utils'

test('başta tüm ürünler listelenir', () => {
  renderAt('/katalog')
  expect(screen.getAllByRole('article')).toHaveLength(products.length)
  expect(screen.getByRole('button', { name: 'Tümü' })).toHaveAttribute('aria-pressed', 'true')
})

test('süzgeç yalnızca seçili kategoriyi gösterir', async () => {
  const user = userEvent.setup()
  renderAt('/katalog')
  await user.click(screen.getByRole('button', { name: 'Çakı' }))
  const folding = products.filter(p => p.category === 'folding')
  expect(screen.getAllByRole('article')).toHaveLength(folding.length)
  expect(screen.getByRole('heading', { name: folding[0].name })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Çakı' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Tümü' })).toHaveAttribute('aria-pressed', 'false')
})
