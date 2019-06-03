// import pick from 'lodash/pick'
import debounce from 'lodash/debounce'

import { sortByVote } from './sort.js'
import { resultToCard, resultToDetail } from './renders.js'
import { getMovieByTitle, getSimilarMovieById } from './services.js'

// getMovieByTitle('Avenger')
//   .then(({ results }) => {
//     console.log('Sugerencia inicial')
//     const sugerencia = results.sort(sortByPolularity).slice(0, 12)
//     console.log(sugerencia.map(x => pick(x, ['id', 'title', 'popularity', 'vote_average'])))
//   })

// -----------

const title = document.getElementById('title')
const errorMessage = document.getElementById('errorMessage')
const similar = document.getElementById('films')
const detail = document.getElementById('detail')

const state = {
  error: null,
  similar: null,
  detail: null
}

title.addEventListener('keyup', debounce(() => {
  const titleContent = title.value.trim()

  if (!titleContent) {
    state.similar = null
    state.error = '¿Estas seguro que esa es tu peli favorita? No me suena.'
    state.detail = null
    return undefined
  }

  getMovieByTitle(titleContent)
    .then(({ results }) => {
      if (!results || results.length === 0) {
        state.error = '¿Estas seguro que esa es tu peli favorita? No me suena.'
        state.similar = null
        state.detail = null
        return undefined
      }

      const sortedResults = results
        .sort(sortByVote)
        .slice(0, 12)

      state.similar = sortedResults
      state.detail = null
      state.error = null

      console.log(state)
      render()
    })
}, 500))

function sendToSimilarMovies (event) {
  const elem = event.target.nodeName === 'IMG'
    ? event.target.parentNode
    : event.target

  console.log(elem)

  getSimilarMovieById(elem.dataset.id)
    .then(({ results }) => {
      if (!results || results.length === 0) {
        document.getElementById('errorMessage').style.display = 'block'
        state.error = '¿Estas seguro que esa es tu peli favorita? No me suena.'
        state.similar = null
        return undefined
      }

      const sortedResults = results
      state.similar = null
      state.detail = sortedResults
      state.error = null
      render()
    })
}

//
// renders
//
function renderError () {
  if (!state.errorMessage) {
    errorMessage.style.display = 'none'
    return undefined
  }

  errorMessage.style.display = 'block'
  errorMessage.innerHTML = state.error
}

function renderGrid () {
  if (!state.similar) {
    similar.style.display = 'none'
    return undefined
  }

  similar.style.display = 'grid'
  similar.innerHTML = resultToCard(state.similar)

  console.log(resultToCard(state.similar))

  let cards = [ ...document.getElementsByClassName('movie-card') ]

  cards.forEach(card => {
    card.addEventListener('click', sendToSimilarMovies)
  })
}

function renderDetail () {
  if (!state.detail) {
    detail.style.display = 'none'
    return undefined
  }
  detail.style.display = 'block'
  detail.innerHTML = resultToDetail(state.detail)
}

function render () {
  renderDetail()
  renderError()
  renderGrid()
}
