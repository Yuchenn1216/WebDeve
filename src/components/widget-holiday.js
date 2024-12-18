import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetHoliday extends LitElement {
    static properties = {
        header: { type: String },
        date: { type: String },
        name: { type: String },
        countryCode: { type: String },
        _countries: { type: String },
        upcomingPublicHolidays: { type: Array }
    }

    static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: #e57c04;
        border-style: solid;
        border-width: 1px;
        margin: 5px 10px 5px 10px;
    }

    #select-country-text {
        font-size: 16px;
    }

    #country-select-form {
        width: 115px;
        height: 40px;
        background-color:#ffffff;
        margin-top: 3px;
        border-radius: 5px;
        border-style: solid;
        border-width: 3px;
        border-color: #b0500c;
    }

    .select-container, .country-container {
        display: flex;
        padding: 3px;
    }

    .select-country-text-container, .select-country-text {
        vertical-align: middle;
        font-weight: bold;
    }

    #header {
        font-size: 16px;
    }

    .public-holidays-container {
        padding: 5px;
    }

    .holiday-table {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3px;
        padding: 5px;
        border: 2px solid #b0500c;
        border-radius: 5px;
        max-width: 100%;
    }

    .date {
        flex: 1;
        margin-right: 10px;
        font-size: 14px;
    }

    .name {
        flex: 3;
        font-size: 14px;
    }
    `;

    constructor() {
        super();
        this.countryName = "Australia";
        this._countries = ["Australia", "Belgium", "Brazil", "Canada", "Switzerland", "China", "Germany", "France", "Honduras", "Indonesia", "Japan",
            "South Korea", "Mexico", "United States"]
        this.countryMapping = {
            "Australia": "AU", "Belgium": "BE", "Brazil": "BR", "Canada": "CA", "Switzerland": "CH", "China": "CN", "Germany": "DE", "France": "FR",
            "Honduras": "HN", "Indonesia": "ID", "Japan": "JP", "South Korea": "KR", "Mexico": "MX", "United States": "US"
        }
        this.upcomingPublicHolidays = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetch();
        console.log("connected");
    }

    _updateCountryCode(event) {
        this.countryName = event.target.value;
        this._fetch();
        console.log("country code");
    }

    _fetch() {
        const countryCode = this.countryMapping[this.countryName];
        const currentDate = new Date();
        const url = `https://date.nager.at/api/v3/PublicHolidays/${currentDate.getFullYear()}/${countryCode}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const upcomingHolidays = data.filter(holiday => new Date(holiday.date) > currentDate).slice(0, 3);
                if (upcomingHolidays.length > 0) {
                    this.upcomingPublicHolidays = upcomingHolidays;
                } else {
                    this.upcomingPublicHolidays = [{ name: 'No upcoming holidays' }];
                }
                console.log(upcomingHolidays);
            });
    }

    render() {
        return html`
        <form class="select-container">
            <div class="select-country-text-container">
                <p id="select-country-text">Select Country:</p>
            </div>

            <div class="country-container">
                <select id="country-select-form" @change="${this._updateCountryCode}">
                    ${this._countries.map(countryCode => html`
                        <option value="${countryCode}" ?selected="${this.countryCode === countryCode}">${countryCode}</option>
                    `)}
                </select>
            </div>
        </form>

        <div class="public-holidays-container">
            <h3 id="header">${this.header}</h3>
            ${this.upcomingPublicHolidays.map(holiday => html`
            <div class="holiday-table">
                <div class="date">${holiday.date}</div>
                <div class="name">${holiday.name}</div>
            </div>
            `)}
        </div>
        `;
    }
}

customElements.define('widget-holiday', WidgetHoliday);