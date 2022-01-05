import routes from '../../routes/routes'

const Navbar = async () => {
  return /*html*/ `
      <nav>   
          <ul class='nav-links'>
              ${routes
                .map((r) => {
                  return `<li><a href=${r.path}>${r.name}</a></li>`
                })
                .join('')}
               
          </ul>
      </nav>
    `
}

export default Navbar
