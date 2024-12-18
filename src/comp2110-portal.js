import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-row.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/widget-weather.js';
import './components/widget-currency.js';
import './components/post-block.js';
import './components/widget-date.js';
import './components/widget-holiday.js';
import './components/task-widget.js';

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
  @media screen and (min-width: 450px) {
    :root {
      font-family: Arial, sans-serif;
    }
    
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      margin: 0 auto;
      text-align: center;
      width:100%;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: auto;
    }

    .page-container {
      grid-column: 1/6;
      grid-row: 1/6;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: auto;
    }

    .widget-container {
      grid-column: 1/6;
      grid-row: 2/3;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }

    .page-header {
      grid-column: 1/6;
      height: 600px;   
      background-image: url("src/images/backgroundImage/page-header.jpeg");
      background-repeat: no-repeat;
      background-size: cover;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 1fr 2fr;
    }

    .login-widget {
      grid-column: 3/6;
      grid-row: 1/2;
      margin-top: 50px;
    }

    .header-logo {
      grid-column: 1/3;
      grid-row: 2/3;
      background-image: url("src/images/backgroundImage/macquarie-university-logo.png");
      background-repeat: no-repeat;
      background-size: contain;
    }

    h1 {
      grid-column: 1/3;
      grid-row: 1/2;
      color: black;
      font-size: 50px;
      text-align: center;
      display:flex;
      justify-content: center;
      align-items:center;
      font-family: monospace;
    }

    main {
      background-color: #E3DFFD;
      grid-column: 1/6;
      width:100%;
      height:100%;
      justify-self: center;
    }

    post {
      margin-top:0;
      grid-column: 1/6;
      grid-row: 2/3;
      height:500px;
      display: grid;
      background-image: url("src/images/backgroundImage/postblockBackground.jpg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    post h2{
      display:flex;
      width: 100%; 
      font-family:Didot;
      justify-content: center;
      align-items:center;
      font-size:40px;
      margin-bottom:0;
    }

    post p {
      display: flex; 
      width: 100%; 
      font-family:Bradley Hand;
      justify-content: center;
      align-items:center;
      margin-top:0;
    }

    post-block {
      margin-top:0;
      height:200px;
      justify-self: center;
    }
    
    blog-block{
      grid-column: 1/3;
      grid-row: 3/4;
    }

    widget-row[header="Widgets"] {
      grid-column: 1/2;
      grid-row: 1/2;
      background-image: url("src/images/backgroundImage/widgets-background.png");
      background-repeat: no-repeat;
      background-size: cover;
    }

    widget-column[header="task"] {
      margin-top:0;
      grid-column: 1/6;
      grid-row: 2/3;
      height:500px;
      display: grid;
      background-image: url("src/images/backgroundImage/taskWidgetBackground.jpeg");
      background-repeat: no-repeat;
      background-size: cover;
      justify-items: center;
      align-items: center;
    }
    
    .app-footer {
      grid-column: 1/6;
      grid-row: 3/4;  
    }
  }

  @media screen and (max-width: 450px) {
    :host {
      font-size: 14pt;
      text-align: center;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto auto;
      width:100%;
    }

    .page-header {
      grid-column: 1/2;
      grid-row: 1/2;
      height: 320px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }

    h1 {
      grid-column: 1/2;
      grid-row: 1/2;
      color: black;
      font-size: 50px;
      background-color: pink;
      text-align: center;
      display:flex;
      justify-content: center;
      align-items:center;
      margin-top: 0;
      margin-bottom: 0;
    }

    .login-widget {
      grid-column: 1/2;
      grid-row: 2/3;
    }

    .widget-container {
      grid-column: 1/2;
      grid-row: 2/3;
      display: grid;
      grid-template-columns: 1fr;
    }

    post {
      grid-column: 1/2;
      grid-row: 3/4; 
      height:500px;
      display: grid;
      background-image: url("src/images/backgroundImage/postblockBackground.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      width:100%;
    }

    post h2{
      display:flex;
      width: 100%; 
      font-family:Didot;
      justify-content: center;
      align-items:center;
      font-size:30px;
      margin-bottom:0;
    }

    post p {
      display: flex; 
      width: 100%; 
      font-family:Bradley Hand;
      justify-content: center;
      align-items:center;
      margin-top:0;
    }

    post-block {
      margin-top:0;
      height:200px;
      width:50%;
      justify-self: center;
     
    }

    blog-block{
      grid-column: 1/2;
      grid-row: 4/5;
    }

    .app-footer {
      grid-column: 1/2;
      grid-row: 5/6;
    }

  }`;

  constructor() {
    super();
    this.header = 'COMP2110 Portal';
  }


  render() {
    return html`
    <div class="page-container">
        <header class="page-header">
          <h1>${this.header}</h1>
          <login-widget class="login-widget"></login-widget>
          <p class="header-logo">
        </header>

        <main>
          <div class="widget-container">
            <widget-row header="Widgets">
              <widget-weather header="First Widget"></widget-weather>
              <widget-currency header="Currency Converter"></widget-currency>
              <widget-date header="Date"></widget-date>
              <widget-holiday header="Upcoming Public Holidays"></widget-holiday>
              <ad-widget></ad-widget>
            </widget-row>

            <widget-column header="task">
              <task-widget header="Task List"></task-widget>
            </widget-column>
          </div>

          <post>
            <h2> Your ideas matter </h2>
            <p>Share your voice and be heard !</p>
            <post-block></post-block>
          </post>

          <blog-block></blog-block>       
        </main>

        <p class="app-footer">
          A product of the COMP2110 Web Development Collective &copy; 2023
        </p>
    </div>

    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal);
