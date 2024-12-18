import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetDate extends LitElement {
    static properties = {
        dateFact: {type: String}
    }

    static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: #b741bf;
        color: white;
        border-style: solid;
        border-width: 1px;
        border-color: black;
        margin: 5px 10px 5px 10px;
    }
    
    .header {
        padding-top: 8px;
    }

    .body {
        text-align: left;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 20px;
        font-size: 17px;
    }
  `;



  constructor() {
    super();
    this.dateFact = "Loading...";

  }


  //Following code uses getMonth and getDate accordingly in order to get the Month and Day respectively, before returning the month and date in a 'mm/dd' format.
  static getCurrentDate() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1);
    const day = currentDate.getDate();
    return `${month}/${day}`;
}
//This code essentially builds the URL of the numbers.api website using the base and modifying the link based on the currentDate from above.
  static BASE_URL = "http://numbersapi.com/";
  static END_URL = this.getCurrentDate() + "/date";



    connectedCallback() {
        super.connectedCallback();
        this._fetch();
    }

//Fetches the text file from the URL. We're not using .json and use .text instead because funny enough the website we're directed to spits out a Text.
    _fetch() {
        fetch(WidgetDate.BASE_URL + WidgetDate.END_URL)
        .then(response => response.text())
            .then((text) => {
                this.dateFact = text;
                console.log(this.dateFact);
            });
    }




    render(){    
        return html`
        <div class = "header">

            <h4 id = "header">Check the Date!</h4>

        </div>

        <div class = "body">

            <p id = "body">${this.dateFact}</p>

        </div>

        `;
    }
}

customElements.define('widget-date', WidgetDate);