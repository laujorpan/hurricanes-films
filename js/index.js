const apikey = "TU_APIKEY"

function getMovieByTitle(title){
    const url= `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=es-ES&query=${title}&page=1&include_adult=true`
    return fetch(url).then(res=>res.json())
}

function findSimilarMovies (data){
    console.log('Tu pelicula es '+data.results[0])
    getSimilarMovieData(data.results[0].id).then(addMovie);
}

function getSimilarMovieData(movieId){
    const url= `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apikey}&language=es-ES&page=1`
    return fetch(url).then(res=>res.json())
}

function addMovie (data){
    console.log(data.results)
}
getMovieByTitle("Memento").then(findSimilarMovies)

