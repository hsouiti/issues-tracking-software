import BaseView from '../BaseView'

class Projects extends BaseView {
  constructor() {
    super()
    this.setTitle('Projects')
  }

  async render() {
    return `
      <h1>Projects</h1>
    `
  }
}

export default Projects
