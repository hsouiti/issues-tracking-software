import BaseView from '../BaseView'

class Login extends BaseView {
  constructor() {
    super()
    this.setTitle('Login')
  }

  async render() {
    return `
      <h1>Login</h1>
      <h3>This the login page</h3>
    `
  }
}

export default Login
