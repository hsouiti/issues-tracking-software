import BaseView from '../BaseView'

class Signup extends BaseView {
  constructor() {
    super()
    this.setTitle('Signup')
  }

  async render() {
    return `
      <h1>Signup</h1>
    `
  }
}

export default Signup
