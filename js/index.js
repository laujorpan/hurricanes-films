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

//-----------
function printResults(data){
    console.log(data)
    films.innerHTML =  data.map(elem=> `<li data-id="${elem.id}">${elem.title}</li>`).join('')
}
    const title = document.getElementById('title');
    const films = document.getElementById('films');
    title.addEventListener('keyup', event => {
        const titleContent = title.value.trim();
      
        if (event.keyCode === 13 && titleContent) {
            getMovieByTitle(titleContent).then(data=>{
                if(data.results && data.results.length>0){
                    document.getElementById("listFilms").style.display = "block";
                    printResults(data.results)
                }else{
                    document.getElementById("errorMessage").style.display = "block";
                }
            } )
        }else{
            document.getElementById("listFilms").style.display = "none";
            document.getElementById("errorMessage").style.display = "none";
        }
      });
    
//-----------
    