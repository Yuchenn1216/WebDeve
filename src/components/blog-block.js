/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * 
 * <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class BlockBlock extends LitElement {
  static properties = {
    _posts: { state: true }
  }

  static styles = css`
  :host {
    margin: 1em;

  }
  .blogpost {
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 10px;
    padding-bottom: 15px;
    box-shadow: 8px 8px 8px 3px #aaa;
  }
  .blogpost h2 {
    font-family: 'Indie Flower', sans-serif;
    background-color: pink;
    text-transform: capitalize;
  }

  .blogpost h3 {
    font-family: 'Indie Flower', sans-serif;
    text-transform: none;
    font-weight: normal;
    font-size: 100%;
  }
  #header {
    font-family:Didot;
    font-size:35px;
  }
  #subheader{
    padding-top:20px;
    font-family:Bradley Hand;
  }
  
  `;

    constructor() {
      super();
      this._fetch();

      this.addEventListener('new-blogpost', () => {
      this._fetch();
       });
    }

    _fetch() {
      const url = `${BASE_URL}blog`;
      fetch(url)
          .then(response => response.json())
          .then(posts => {
              this._posts = posts.posts;
          });
      } 


  // A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library

  static formatBody(text) {
    const paragraphs = text.split('\r\n')
    return paragraphs.map(paragraph => html`<p>${paragraph}</p>`)
  }
  
  render() {
    if (!this._posts)
      return html`Loading...`
    
      
    return html`
      <h2 id="header">Blog</h2>
      <p id="subheader">Keep up with the latest news and trends on our blog.</p>
      ${this._posts.map(post => html`<div class="blogpost">
        <h2>${post.title ?? 'Untitled'}</h2>
        <h3>By ${post.name ?? 'Unknown Author'}</h3>
        ${BlockBlock.formatBody(post.content ?? 'No content :(')}
      </div>`)}
      `;
  }
}

customElements.define('blog-block', BlockBlock);


