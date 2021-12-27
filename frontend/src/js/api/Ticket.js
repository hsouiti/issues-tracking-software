import { getAllData } from './index'

const API = 'tickets'

class TicketUI {
  async renderTickets() {
    const tickets = await getAllData()
    return `
    <div>
        ${tickets.map((ticket) => {
          return <li>${ticket.title}</li>
        })}
    </div>
    `
  }

  createTicket(ticket) {}

  updateTicket(ticketId) {}

  deleteTicket(ticketId) {}
}

export default TicketUI
