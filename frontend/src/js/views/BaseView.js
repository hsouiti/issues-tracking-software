const siteName = 'Tracky'

class BaseView {
  constructor() {}

  setTitle(title) {
    document.title = `${siteName} | ${title}`
  }

  async render() {
    return ''
  }
}

export default BaseView
