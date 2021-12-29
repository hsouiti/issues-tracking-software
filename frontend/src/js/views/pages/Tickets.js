import BaseView from '../BaseView'

class Tickets extends BaseView {
  constructor() {
    super()
    this.setTitle('Tickets')
  }

  async render() {
    return `
      <h1>Tickets</h1>
    `
  }
}

export default Tickets
