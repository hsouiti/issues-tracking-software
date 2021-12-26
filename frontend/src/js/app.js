import '../styles/main.scss'
import { baseApiURL } from './helpers/constants'

console.log('from app.js using scss')

const pingBackend = () => {
  console.log('here')
  fetch(`${baseApiURL}/tickets`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}
pingBackend()


// code splitting & lawy loading