import BaseView from '../BaseView'

class Error404 extends BaseView {
  constructor() {
    super()
    this.setTitle('Error 404')
  }

  async render() {
    return `
          <section class="section">
               <h1> 404 Error </h1>
          </section>
            `
  }
}

export default Error404
