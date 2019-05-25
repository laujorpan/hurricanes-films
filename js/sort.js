export function sortByVote (a, b) {
  return b.popularity * b.vote_average - a.popularity * a.vote_average
}

export function sortByPolularity (a, b) {
  return b.popularity - a.popularity
}
