export function resultToList (result) {
  return result
    .map(elem => `<li data-id="${elem.id}">${elem.title}</li>`)
    .join('')
}
