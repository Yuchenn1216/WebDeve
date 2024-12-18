import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetCurrency extends LitElement {
    static properties = {
        header: { type: String },
        fromCurrencyType: { type: String },
        toCurrencyType: { type: String },
        typeNameMap: { type: Object },
        rate: { type: Number },
        amount: { type: Number },
        result: { type: Number },
        date: { type: String }
    }

    static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: #fcf7c5;
        border-style: solid;
        border-width: 1px;
        margin: 5px 10px 5px 10px;
    }

    .header-row {
        margin-bottom:0px;
    }

    #header {
        font-size:15px;
        padding-top:10px;
        float: left;
        margin-left:15px;
    }

    #currency_icon{
        padding-top:5px;
        height:25%;
        width:25%;
    }
    
    .label {
        display: flex;
        align-items: center; 
        justify-content: space-between; 
        padding-left: 40px; 
        padding-right: 45px;
    }

    #exchange-icon{
        height:15px;
        width:15px;

    }
    
    #label1, #label2 {
        font-size:12px
    }

    #from-currency-select,#to-currency-select{
        width:115px;
        height:30px;
        background-color:#ffffff;
        margin-inline: 3px;
        border-radius: 5px;
        border-style: solid;
        border-width: 3px;
        border-color: #f5ea7f;
    }

    .select-container {
        display: flex;
        flex-direction: row;
        padding-left:5px;
        margin-bottom:3px;
      }

    .textInput-container {
        display: flex;
        flex-direction: row;
        padding-left:5px;

      }

      input {
        width:105px;
        height:20px;
        background-color:#ffffff;
        margin-inline: 3px;
        border-radius: 5px;
        border-style: solid;
        border-width: 3px;
        border-color: #f5ea7f;
    }

    #calendar{
        margin-top:10px;
        margin-bottom:10px;
    }

    .rates-container label {
        font-size: 13px;
      }

    .rates-container input[type="submit"] {
        width: auto;
        height:auto;
        cursor: pointer;
      }
    
    .rates-container input[type="submit"]:active {
        background-color:#f5ea7f;
      }
  `;

    constructor() {
        super();
        this.header = 'Currency';
        this.currencyData = {};
        this.fromCurrencyType = "USD";
        this.toCurrencyType = "AUD";
        this._types = ["USD", "AUD", "CNY", "EUR", "JEP", "GBP", "FJD", "PHP", "THB", "TRY", "INR", "VND"];

        this.rate = null;
        this.amount = 1;
        this.result = null;
        this.date = WidgetCurrency.getCurrentDate();

    }

    static getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetch();

    }

    _updateFromCurrencyType(event) {
        this.fromCurrencyType = event.target.value;
        this._fetch();
    }

    _updateToCurrencyType(event) {
        this.toCurrencyType = event.target.value;
        this._fetch();
    }

    _updateAmountFrom(event) {
        const inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            this.amount = parseFloat(inputValue);
            this._fetch();
        }
    }

    _updateDate(event) {
        event.preventDefault();
        this.date = event.target.querySelector('#date').value;
        console.log(this.date);
        this._fetch();
    }

    _exchangeType(event) {
        // swap currency types
        [this.fromCurrencyType, this.toCurrencyType] = [this.toCurrencyType, this.fromCurrencyType];
        // update selected options
        const fromSelect = this.shadowRoot.querySelector('#from-currency-select');
        const toSelect = this.shadowRoot.querySelector('#to-currency-select');
        fromSelect.value = this.fromCurrencyType;
        toSelect.value = this.toCurrencyType;
        this._fetch();
    }

    _fetch() {
        const url = `https://api.exchangerate.host/convert?from=${this.fromCurrencyType}&to=${this.toCurrencyType}&amount=${this.amount}&date=${this.date}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.currencyData = data;
                this.rate = this.currencyData.info.rate;
                this.result = this.currencyData.result;
                console.log(this.result);
            });
    }

    render() {
        return html`
        <div class="header-row">
            <img id="currency_icon" src="src/images/currency-icons/currency-logo.png" ></img>
            <h3 id="header">${this.header}</h3>
        </div>
        
        <form>
            <div class="label">
                <p id="label1">From:</p>
                <img id="exchange-icon" src="src/images/currency-icons/exchange.png" style="cursor: pointer;" @click="${this._exchangeType}" >
                <p id="label2">To:</p>
            </div>

            <div class="select-container">
                <select id="from-currency-select" @change="${this._updateFromCurrencyType}">
                    ${this._types.map(type => html`
                        <option value="${type}" ?selected="${this.fromCurrencyType === type}">${type}</option>
                    `)}
                </select>
            
                <select id="to-currency-select" @change="${this._updateToCurrencyType}">
                    ${this._types.map(type => html`
                        <option value="${type}" ?selected="${this.toCurrencyType === type}">${type}</option>
                    `)}
                </select>
            </div>

            <div class="textInput-container">
                <input type="text" id="currency-input-from" @input="${this._updateAmountFrom}" value="${this.amount}">
                <input type="text" id="currency-input-to"  value="${this.result}" disabled>
            </div>
        </form> 

        <form class="rates-container" @submit="${this._updateDate}">
            <div id = "calendar">
                <label for="date">Rates on:</label>
                 <input type="date" id="date" value="${this.date}" min="2015-01-01" max="${WidgetCurrency.getCurrentDate()}">
            </div>
            <input type="submit" value="Check">
        </form>
    `;
    }
}

customElements.define('widget-currency', WidgetCurrency);
