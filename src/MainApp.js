import { LitElement, css, html } from 'lit'
import { YoutubeDataGrid } from './components/YoutubeDataGrid'


export class MainApp extends LitElement {
  static get properties() {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    }
  }

  constructor() {
    super()
    this.docsHint = ''
    this.count = 0
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem;
          text-align: center;
        }

        .logo {
          height: 3rem;
          padding: 0.5rem 1rem;
          filter: drop-shadow(0 0 2em #646cffaa);
          transition: filter 0.3s;
        }

        .logo:hover {
          filter: drop-shadow(0 0 2em #535bffaa);
        }

        .card {
          padding: 1rem;
        }

        .read-the-docs {
          color: #888;
        }

        a {
          font-weight: bold;
          color: #646cff;
        }

        a:hover {
          color: #535bff;
        }

        ::slotted(h1) {
          font-size: 2rem;
          line-height: 1.2;
        }

        button {
          border-radius: 0.5rem;
          border: none;
          padding: 0.6rem 1.2rem;
          font-size: 1rem;
          font-weight: bold;
          background-color: #1a1a1a;
          color: white;
          cursor: pointer;
          transition: background-color 0.25s;
        }

        button:hover {
          background-color: #535bff;
        }

        button:focus,
        button:focus-visible {
          outline: 4px auto #646cff;
        }

        @media (prefers-color-scheme: light) {
          a:hover {
            color: #747bff;
          }

          button {
            background-color: #f9f9f9;
          }
        }
      </style>
      <div class="container mx-0  flex flex-col gap-4 p-4">
        <h1 class="text-xl font-bold">YouTube API </h1>
      </div>
      <youtube-data-grid />
      <slot></slot>
     
    `
  }

  _onClick() {
    this.count++
  }
}

window.customElements.define('main-app', MainApp)
