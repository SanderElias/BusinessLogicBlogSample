
export const urlify= (url) => {
  let r = `${url.replace('http:','https:')}`
  if (r.includes('format=json')) {return r}
  if (r.includes('?')) {return `${r}&format=json`}
  return `${r}?format=json`
}