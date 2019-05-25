export const apiRequest = KEY => URI => (params) => {
  const url = new URL(`https://api.themoviedb.org/3/${URI}`)

  url.searchParams.append('language', 'es-ES')
  url.searchParams.append('api_key', KEY)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return fetch(url).then(res => res.json())
}
