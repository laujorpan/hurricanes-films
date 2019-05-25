export function resultToList (result) {
  return result
    .map(elem => `<li data-id="${elem.id}">${elem.title}</li>`)
    .join('')
}

export function resultToCard (result) {
  return result
    .map(elem => `<div class="nes-container with-title  movie-card" data-id="${elem.id}">
      <p class="title">${elem.title}</p>
      <div class="movie-card__img">
        <img src="https://image.tmdb.org/t/p/w500/${elem.poster_path}" />
      </div>
    </div>`
    )
    .join('')
}
