import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
  }

  static styles = css`
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);
    :host {
        display: block;
    }
    .login-widget {
      width: 360px;
      padding: 8% 0 0;
      margin: auto;

      position: relative;
      z-index: 1;
      background: #FFFFFF;
      max-width: 360px;
      margin: 0 auto 100px;
      padding: 45px;
      text-align: center;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .login-widget input {
      font-family: "Roboto", sans-serif;
      outline: 0;
      background: #f2f2f2;
      width: 100%;
      border: 0;
      margin: 0 0 15px;
      padding: 15px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .login-widget button {
      font-family: "Roboto", sans-serif;
      text-transform: uppercase;
      outline: 0;
      background: #4CAF50;
      width: 100%;
      border: 0;
      padding: 15px;
      color: #FFFFFF;
      font-size: 14px;
      -webkit-transition: all 0.3 ease;
      transition: all 0.3 ease;
      cursor: pointer;
    }
    .login-widget button:hover,.login-widget button:active,.login-widget button:focus {
      background: #43A047;
    }   
    }`;
  

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }


  async submitForm(event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const response = await fetch(this.loginUrl, {
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    });

    const result = await response.json();
    this.user = result;
    storeUser(result);

    this.reloadWindow();
}


  reloadWindow() {
    window.location.reload();
  }

  logout() {
    deleteUser();
    this.user = null;
    this.reloadWindow();
  }

  render() {
    if (this.user) {
      return html`
        <div class="login-widget">
          <p>Logged in as ${this.user.name}</p>
          <button @click=${this.logout}>Logout</button>
        </div>`;
    } 
    return html`
      <div class="login-widget">
        <form @submit=${this.submitForm}>
            Username: <input name="username">
            Password: <input type="password" name="password">
            <button>login</button>
        </form>
      </div>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);