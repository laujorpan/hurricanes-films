import { sortByPolularity } from '../js/sort'

describe('test sobre los sorts', () => {
  test('sortByPopularity 1 and 2 give us positive num', () => {
    expect(sortByPolularity(1, 2)).toBeGreaterThan(0)
  })

  test('sortByPopularity 2 and 1 give us negative num', () => {
    expect(sortByPolularity(2, 1)).toBeLessThan(0)
  })
})
