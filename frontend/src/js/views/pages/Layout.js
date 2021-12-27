import header from '../components/header'
import footer from '../components/footer'

const Layout = {
  render: async () => {
    return `<div>
            ${header.render()}
            ${footer.render()}      
        </div>`
  },
}

export default Layout
