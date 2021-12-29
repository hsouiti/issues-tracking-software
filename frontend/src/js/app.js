import '../styles/main.scss'
import Navbar from './views/components/navbar'
import Router from './routes/Router'

const App = async () => {
  const header = await document.getElementById('header')
  header.innerHTML = await Navbar()
  const navLinks = document.querySelector('.nav-links').children
  ;[...navLinks].forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      history.pushState('', '', e.target.pathname)
      Router()
    })
  })
  Router()
}

export default App



