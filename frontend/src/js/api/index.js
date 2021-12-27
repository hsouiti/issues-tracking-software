export const baseApiURL = `http://localhost:3500/api/v1`

const api = 'tickets'
export const getAllData = async () => {
  try {
    const response = await fetch(`${baseApiURL}/${api}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}
