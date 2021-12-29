import BaseView from '../BaseView'

class Home extends BaseView {
  constructor() {
    super()
    this.setTitle('Home Page')
  }

  async render() {
    return /*html*/ `
            <section class="section">
                <h1>Home</h1>
            </section>
        `
  }
}

export default Home
