import '../styles/main.scss'
import TicketUI from './api/Ticket'
import Layout from './views/pages/Layout'
// code splitting & lawy loading

import Login from './views/pages/Login'

const view = new TicketUI()
document.getElementById('root').innerHTML = await view.renderTickets()


