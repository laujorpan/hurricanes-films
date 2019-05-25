import { sortByPolularity, sortByVote } from '../js/sort'

describe('test sobre los sorts', () => {
  test('sortByPopularity 1 and 2 give us positive num', () => {
    expect(sortByPolularity({ popularity: 1 }, { popularity: 2 })).toBeGreaterThan(0)
  })

  test('sortByPopularity 2 and 1 give us negative num', () => {
    expect(sortByPolularity({ popularity: 2 }, { popularity: 1 })).toBeLessThan(0)
  })

  test('sortByPopularity 1 and 2 give us positive num', () => {
    const result = sortByVote({ popularity: 1, vote_average: 1 }, { popularity: 2, vote_average: 1 })
    expect(result).toBeGreaterThan(0)
  })

  test('sortByPopularity 2 and 1 give us negative num', () => {
    const result = sortByVote({ popularity: 2, vote_average: 1 }, { popularity: 1, vote_average: 1 })
    expect(result).toBeLessThan(0)
  })
})
