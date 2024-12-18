// use lit to create a script that can post to the blog
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '../auth.js';
import { BASE_URL } from '../config.js';

class PostWidget extends LitElement {
  static properties = {
    user: { type: String, state: true }
  }

  static styles = css`
    @media screen and (min-width: 450px) {
        :host {
            display: block;
            background-color:#E3DFFD;
            height:30%;
            width:40%;
            margin-top:85px;
            padding:10px;
            border-radius:15px;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left:30px;
            height: 100%;
            align-items: center;
            text-align: center; 
          }
          
        #input-one,
        #input-two {
            display: flex;
            margin-bottom: 15px;
            width: 100%;
          }
          
        label {
            display: inline-block;
            width: 80px;
            text-align: left;
            margin-right: 20px;
            font-size:16px;
          }

        input{
          border-radius: 5px;
          border-style: solid;
          border-width: 3px;
          border-color: #c0b8f5; 
        }

        textarea{
          border-radius: 5px;
          border-style: solid;
          border-width: 3px;
          border-color: #c0b8f5;  
        }

        #input-one textarea{
            width: 60%; 
            height: 50%;
          }

        #input-two textarea{
          width: 60%; 
          height: 200%;
        }
      
        form input[type="submit"]{
          margin-top: 65px;
            cursor: pointer;
            background-color:#ffffff;
            font-size:15px;
          }

        form input[type="submit"]:active {
            background-color:#c0b8f5; 
          }
        }

        @media screen and (max-width: 450px) {
          :host {
            display: block;
            background-color:#E3DFFD;
            height:100%;
            width:100%;
            margin-top:85px;
            padding:10px;
            border-radius:15px;
            align-items: center;
            justify-content: center; 
         }
 
        label {
            margin-right: 20px;
            align-items: center;
            font-size:16px;
          }

        textarea{
          border-radius: 5px;
          border-style: solid;
          border-width: 3px;
          border-color: #c0b8f5;  
        }

        #input-one textarea{
            width: 90%; 
          }

        #input-two textarea{
          width: 90%; 
        }

        input{
          border-radius: 5px;
          border-style: solid;
          border-width: 3px;
          border-color: #c0b8f5; 
          margin-top: 50px;
          cursor: pointer;
          background-color:#ffffff;
          font-size:15px;
        }

        form input[type="submit"]:active {
            background-color:#c0b8f5; 
          }
        }
        `;

  constructor() {
    super();
    this.postUrl = `${BASE_URL}blog`;
    this.user = getUser();
  }

  async submitForm(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    const response = await fetch(this.postUrl, {
      method: 'post',
      headers: { 'Authorization': `Basic ${this.user.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const result = await response.json();
    this.reloadWindow();
  }

  reloadWindow() {
    window.location.reload();
  }

  render() {
    if (this.user == null) {
      return html`<p>Log in to post</p>`
    }
    return html`
        <form @submit=${this.submitForm}>
            <div id="input-one">
              <label for="title">Title:</label>
              <textarea name="title"></textarea><br><br>
            </div>

            <div id="input-two">
              <label for="content">Content: </label>
              <textarea name="content"></textarea><br><br>
            </div>
            <input type='submit' value='Post'>
        </form>`;
  }
}

customElements.define('post-block', PostWidget);