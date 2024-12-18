import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetRow extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
        display: block;
        padding: 10px;
    }

    h2 {
        margin: 0;
    }
  
    slot {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px;
    }
  `;

  constructor() {
    super();
    this.header = 'Widgets';
  }

  render() {
    return html`
      <div>
        <h2>${this.header}</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('widget-row', WidgetRow);