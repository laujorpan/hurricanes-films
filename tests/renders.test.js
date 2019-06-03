import { resultToList, resultToCard } from '../js/renders'

describe('pruebo los renders', () => {
  test('lista vacía', () => {
    expect(resultToList([])).toBe('')
  })

  test('con elementos', () => {
    expect(resultToList([{ id: 1, title: 'prueba' }])).toBe('<li data-id="1">prueba</li>')
  })

  test('lista vacía', () => {
    expect(resultToCard([])).toBe('')
  })
})
