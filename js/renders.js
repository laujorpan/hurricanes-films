export function resultToList (result) {
  return result
    .map(elem => `<li data-id="${elem.id}">${elem.title}</li>`)
    .join('')
}

export function resultToCard (result) {
  return result
    .map(elem => `<div class="nes-container with-title  movie-card" data-id="${elem.id}">
      <p class="title">${elem.title.length < 30 ? elem.title : elem.title.slice(0, 27) + ' ...'}</p>
      <img src="https://image.tmdb.org/t/p/w500/${elem.poster_path}" class="movie-card__img"/>
    </div>`
    )
    .join('')
}

export function resultToDetail (result) {
  const elem = result[0]
  return `<div class="nes-container with-title">
    <p class="title">${elem.title}</p>
    <div class="grid-2">
      <img src="https://image.tmdb.org/t/p/w500/${elem.poster_path}" class="detail__img"/>
      <p style="margin: 0 5rem">${elem.overview}</p>
    </div>
  </div>`
}
