import App from './js/app'
import Router from './js/routes/Router'

window.addEventListener('DOMContentLoaded', () => App())
window.addEventListener('popstate', () => Router())
