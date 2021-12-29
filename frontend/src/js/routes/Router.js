import routes from './routes'
import Error404 from '../views/pages/Error404'

const Router = async () => {
  const path = window.location.pathname
  const { view = Error404 } =
    routes.find((r) => r.path.trim() === path.trim()) || {}
  const page = new view()
  document.getElementById('main').innerHTML = await new page.render()
}

export default Router
