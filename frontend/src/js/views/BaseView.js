const siteName = 'Tracky'

class BaseView {
  // change the title in every page
  setTitle(title) {
    document.title = `${siteName} | ${title}`
  }

  async render() {
    return ''
  }
}

export default BaseView
