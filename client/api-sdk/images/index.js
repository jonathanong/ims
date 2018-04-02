
const { stringify } = require('query-string')

export const getImageById = async (id) => {
  const response = await fetch(`/api/images/${id}`, {
    credentials: 'include'
  })

  if (response.status !== 200) {
    const err = new Error(`Error fetching image with id=${id}.`)
    err.status = response.status
    throw err
  }

  return response.json()
}

export const getImages = async (options = {}) => {
  const path = `/api/images?` + stringify(options)
  const response = await fetch(path, {
    credentials: 'same-origin'
  })

  if (response.status !== 200) {
    const err = new Error(`Error fetching ${path}.`)
    err.status = response.status
    throw err
  }

  return response.json()
}
