import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetWeather extends LitElement {
    static properties = {
        header: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
        weatherData: { type: Object },
        weathercodeMap: { type: Object },
        temperatureData: { type: Number },
        timeData: { type: Number },
        windspeedData: { type: Number },
        winddirectionData: { type: Number },
        weathercodeData: { type: Number },
    }

    static styles = css`
        :host {
            display: block;
            width: 250px;
            height: 250px;
            background-color: azure;
            border-style: solid;
            border-width: 1px;
            margin: 5px 10px 5px 10px;
        }
        .container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1.5fr 1fr 1fr 1fr;
            padding: 5px;
            background-color: #0090C1;
        }
        .temp {
            grid-column: 1 / 3;
            grid-row: 1 / 2;

        }
        .temp_text {
            text-align: center;
            font-size: 45px;
            color: white;
            margin-top: 20px;
        }
        .weathercode {
            grid-column: 1 / 4;
            grid-row: 2 / 3;

            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }
        .weathercode_text {
            text-align: left;
            margin-left: 10px;
            font-size: 16px;
            color: white;
            grid-column: 1 / 3;
        }
        .weathercode_icon {
            display: block;
            grid-column: 3/4;
            width: 100%;
            marginleft: auto;
            marginright: auto;
            
        }
        .windspeed {
            display: flex;
            grid-column: 1 / 4;
            grid-row: 3 / 4;

        }
        .windspeed_text {
            text-align: left;
            margin-left: 10px;
            font-size: 16px;
            color: white;
        }
        .winddirection {
            display: flex;
            grid-column: 1 / 4;
            grid-row: 4 / 5;

        }
        .winddirection_text {
            text-align: left;
            font-size: 16px;
            margin-left: 10px;
            color: white;
        }


    `;

    constructor() {
        super();
        this.header = 'Weather Widget';
        this.latitude = 0;
        this.longitude = 0;
        this.wateherData = {};
        this.temperatureData = 0;
        this.timeData = 0;
        this.windspeedData = 0;
        this.winddirectionData = 0;
        this.weathercodeData = 0;
        this.weathercodeMap = {
            "0": "Clear sky",
            "1": "Mainly clear",
            "2": "Partly cloudy",
            "3": "Overcast",
            "45": "Fog",
            "48": "Depositing rime fog",
            "51": "Drizzle: Light",
            "53": "Drizzle: Moderate",
            "55": "Drizzle: Dense",
            "56": "Freezing Drizzle: Light",
            "57": "Freezing Drizzle: Dense",
            "61": "Rain: Slight",
            "63": "Rain: Moderate",
            "65": "Rain: Heavy",
            "66": "Freezing Rain: Light",
            "67": "Freezing Rain: Heavy",
            "71": "Snow fall: Slight",
            "73": "Snow fall: Moderate",
            "75": "Snow fall: Heavy",
            "77": "Snow grains",
            "80": "Rain showers: Slight",
            "81": "Rain showers: Moderate",
            "82": "Rain showers: Violent",
            "85": "Snow showers: Slight",
            "86": "Snow showers: Heavy",
            "95": "Thunderstorm: Slight or moderate",
            "96": "Thunderstorm with slight hail",
            "99": "Thunderstorm with heavy hail"
          }
    }

    connectedCallback() {
        super.connectedCallback();
        // get latitude and longitude
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.fetchWeatherData();
        },
        (error) => {
            console.log(error);
        }
        );
        this.requestUpdate();
    }

    fetchWeatherData() {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&current_weather=true`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.wateherData = data;
                console.log(this.wateherData)
                this.temperatureData = this.wateherData.current_weather.temperature;
                this.timeData = this.wateherData.current_weather.time;
                this.windspeedData = this.wateherData.current_weather.windspeed;
                this.winddirectionData = this.wateherData.current_weather.winddirection;
                this.weathercodeData = this.wateherData.current_weather.weathercode;
            });
    }

    render() {
        return html`
            <div class="container">
                <div class="temp">
                    <h class="temp_text">${this.temperatureData}°C</h2>
                </div>
                <img class="weathercode_icon" src="src/images/weather_icons/${this.weathercodeData}.png" ></img>
                <div class="weathercode">
                    <h class="weathercode_text">${this.weathercodeMap[this.weathercodeData]}</h2>
                </div>
                <div class="windspeed">
                    <h class="windspeed_text">Wind Speed: ${this.windspeedData}km/h</h2>
                </div>
                <div class="winddirection">
                    <h class="winddirection_text">Wind Direction: ${this.winddirectionData}°</h2>
                </div>
            </div>

        `;
    }
      
}

customElements.define('widget-weather', WidgetWeather);