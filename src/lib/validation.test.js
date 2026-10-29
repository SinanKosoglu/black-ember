import { validateOrder, validateNotify } from './validation'

const valid = {
  name: 'Test Kullanıcı',
  phone: '0500 000 00 00',
  email: 'test@ornek.com',
  quantity: '1',
  adult: true,
  consent: true,
}

test('geçerli sipariş boş nesne döndürür', () => {
  expect(validateOrder(valid, 2)).toEqual({})
})

test('boşluktan oluşan ad hatalıdır', () => {
  expect(validateOrder({ ...valid, name: '   ' }, 2).name).toBe('Adınızı yazın.')
})

test.each(['', '0', '1.5', '3'])('adet %j stok 2 iken hatalıdır', quantity => {
  expect(validateOrder({ ...valid, quantity }, 2).quantity).toBe('Adet 1 ile 2 arasında olmalı.')
})

test('adet stok sınırında geçerlidir', () => {
  expect(validateOrder({ ...valid, quantity: '2' }, 2)).toEqual({})
})

test.each(['+90 500 000 00 00', '(0500) 000-00-00'])('telefon %j geçerlidir', phone => {
  expect(validateOrder({ ...valid, phone }, 2).phone).toBeUndefined()
})

test('kısa telefon hatalıdır', () => {
  expect(validateOrder({ ...valid, phone: '123' }, 2).phone).toBe('Geçerli bir telefon numarası yazın.')
})

test('eksik alanlı e-posta hatalıdır', () => {
  expect(validateOrder({ ...valid, email: 'test@ornek' }, 2).email).toBe('Geçerli bir e-posta yazın.')
})

test('18 yaş ve KVKK onayı zorunludur', () => {
  const errors = validateOrder({ ...valid, adult: false, consent: false }, 2)
  expect(errors.adult).toBe('Sipariş için 18 yaşından büyük olmalısınız.')
  expect(errors.consent).toBe('KVKK metnini onaylayın.')
})

test('validateNotify ad, e-posta ve onayı denetler', () => {
  expect(validateNotify({ name: 'Test Kullanıcı', email: 'test@ornek.com', consent: true })).toEqual({})
  expect(validateNotify({ name: ' ', email: 'x', consent: false })).toEqual({
    name: 'Adınızı yazın.',
    email: 'Geçerli bir e-posta yazın.',
    consent: 'KVKK metnini onaylayın.',
  })
})
