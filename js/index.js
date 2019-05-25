import pick from 'lodash/pick'
import { sortByPolularity, sortByVote } from './sort.js'
import { resultToCard } from './renders.js'
import { getMovieByTitle, getSimilarMovieById } from './services.js'

getMovieByTitle('Avenger')
  .then(({ results }) => {
    console.log('Sugerencia inicial')
    const sugerencia = results.sort(sortByPolularity).slice(0, 12)
    console.log(sugerencia.map(x => pick(x, ['id', 'title', 'popularity', 'vote_average'])))
  })

// -----------

const title = document.getElementById('title')
const films = document.getElementById('films')

title.addEventListener('keyup', event => {
  const titleContent = title.value.trim()

  if (!event.keyCode === 13 || !titleContent) {
    document.getElementById('listFilms').style.display = 'none'
    document.getElementById('errorMessage').style.display = 'none'
    return undefined
  }

  getMovieByTitle(titleContent)
    .then(({ results }) => {
      if (!results || results.length === 0) {
        document.getElementById('errorMessage').style.display = 'block'
        return undefined
      }

      const sortedResults = results
        .sort(sortByVote)
        .slice(0, 12)

      document.getElementById('listFilms').style.display = 'block'
      films.innerHTML = resultToCard(sortedResults)
    })
})

// -----------
getMovieByTitle('Avenger')
  .then(({ results }) => getSimilarMovieById(results[0].id))
  .then(({ results }) => {
    results.sort(sortByVote)
    console.log('recomendacion')
    console.log(results.map(x => pick(x, [ 'title', 'id', 'vote_average', 'popularity' ])))
  })
