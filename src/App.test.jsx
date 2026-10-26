import { render, screen } from '@testing-library/react'
import App from './App'

test('atölyenin adını ve hikâyesini gösterir', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Black Ember' })).toBeInTheDocument()
  expect(screen.getByText(/her parça tek tek yapılır/)).toBeInTheDocument()
})
