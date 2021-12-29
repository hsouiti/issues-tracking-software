import Home from '../views/pages/Home.js'
import Projects from '../views/pages/Projects'
import Tickets from '../views/pages/Tickets'
import Login from '../views/pages/Login'
import Signup from '../views/pages/Signup'

const routes = [
  { path: '/', name: 'home', view: Home },
  { path: '/projects', name: 'projects', view: Projects },
  { path: '/tickets', name: 'tickets', view: Tickets },
  { path: '/login', name: 'login', view: Login },
  { path: '/signup', name: 'signup', view: Signup },
]

export default routes
