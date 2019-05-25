import { apiRequest } from './api.js'

const mdb = apiRequest(process.env.API_KEY)

export const getMovieByTitle = title =>
  mdb('search/movie')({ query: title })

export const getSimilarMovieById = movieID =>
  mdb(`movie/${movieID}/similar`)({})
