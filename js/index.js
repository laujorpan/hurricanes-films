// import debounce from 'lodash/debounce'
import pick from 'lodash/pick'

const apikey = "TU_APIKEY"

const apiRequest = KEY => URI => (params) => {
    const url = new URL(`https://api.themoviedb.org/3/${URI}`)
    url.searchParams.append('language', 'es-ES')
    url.searchParams.append('api_key', KEY)
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
    })

    return fetch(url).then(res => res.json())
}

const mdb = apiRequest(apikey)

const getMovieByTitle = title => mdb('search/movie')({ query: title })
const getSimilarMovieById = movieID => apiRequest(apikey)(`movie/${movieID}/similar`)({})


// function findSimilarMovies (data){
//     console.log('Tu pelicula es '+data.results[0])
//     getSimilarMovieData(data.results[0].id).then(addMovie);
// }

// function getSimilarMovieData(movieId){
//     const url= `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apikey}&language=es-ES&page=1`
//     return fetch(url).then(res=>res.json())
// }

// function addMovie (data){
//     console.log(data.results)
// }

const sortByVote = (a, b) => b.popularity * b.vote_average - a.popularity * a.vote_average
const sortByPolularity = (a, b) => b.popularity - a.popularity


getMovieByTitle('Avenger')
    .then(({ results }) => {
        console.log('Sugerencia inicial')
        const sugerencia = results.sort(sortByPolularity).slice(0, 12)
        console.log(sugerencia.map(x => pick(x, ['id', 'title', 'popularity', 'vote_average'])))
    })

getMovieByTitle("Avenger")
    .then(({ results }) => getSimilarMovieById(results[0].id))
    .then(({ results }) => {
        results.sort(sortByVote)
        console.log('recomendacion')
        console.log(results.map(({ title, id, vote_average, popularity }) => ({ title, id, vote_average, popularity })))
    })

