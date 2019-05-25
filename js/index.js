import pick from 'lodash/pick'

const apiRequest = KEY => URI => (params) => {
  const url = new URL(`https://api.themoviedb.org/3/${URI}`)
  url.searchParams.append('language', 'es-ES')
  url.searchParams.append('api_key', KEY)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return fetch(url).then(res => res.json())
}

const mdb = apiRequest(process.env.API_KEY)

const getMovieByTitle = title => mdb('search/movie')({ query: title })
const getSimilarMovieById = movieID => apiRequest(process.env.API_KEY)(`movie/${movieID}/similar`)({})

const sortByVote = (a, b) => b.popularity * b.vote_average - a.popularity * a.vote_average
const sortByPolularity = (a, b) => b.popularity - a.popularity

getMovieByTitle('Avenger')
  .then(({ results }) => {
    console.log('Sugerencia inicial')
    const sugerencia = results.sort(sortByPolularity).slice(0, 12)
    console.log(sugerencia.map(x => pick(x, ['id', 'title', 'popularity', 'vote_average'])))
  })

// -----------

const resultToList = input =>
  input
    .map(elem => `<li data-id="${elem.id}">${elem.title}</li>`)
    .join('')

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

      document.getElementById('listFilms').style.display = 'block'
      films.innerHTML = resultToList(results)
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
