// import pick from 'lodash/pick'
import debounce from 'lodash/debounce'

import { sortByVote } from './sort.js'
import { resultToCard } from './renders.js'
import { getMovieByTitle , getSimilarMovieById} from './services.js'

// getMovieByTitle('Avenger')
//   .then(({ results }) => {
//     console.log('Sugerencia inicial')
//     const sugerencia = results.sort(sortByPolularity).slice(0, 12)
//     console.log(sugerencia.map(x => pick(x, ['id', 'title', 'popularity', 'vote_average'])))
//   })

// -----------

const title = document.getElementById('title')
const films = document.getElementById('films')

title.addEventListener('keyup', debounce(() => {
  const titleContent = title.value.trim()

  if (!titleContent) {
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
      let cards=document.getElementsByClassName("movie-card")
      for(var i = 0; i < cards.length; i++) {
        (function(index) {
            cards[index].addEventListener("click",sendToSimilarMovies)
        })(i);
      }
      
    })
}, 500))

// -----------
// getMovieByTitle('Avenger')
//   .then(({ results }) => getSimilarMovieById(results[0].id))
//   .then(({ results }) => {
//     results.sort(sortByVote)
//     console.log('recomendacion')
//     console.log(results.map(x => pick(x, [ 'title', 'id', 'vote_average', 'popularity' ])))
//   })

function sendToSimilarMovies(elem){
  getSimilarMovieById(this.dataset.id).then(({ results }) => {
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
}