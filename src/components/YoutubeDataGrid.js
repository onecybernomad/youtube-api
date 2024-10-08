import { LitElement, css, html } from 'lit';
import YoutubeService from '../utils/YoutubeService.js';
import PaginationComponent from './ui/PaginationComponent.js';

export class YoutubeDataGrid extends LitElement {
  static get properties() {
    return {
      keyword: { type: String },
      sortBy: { type: String },
      videos: { type: Array },
      totalResults: { type: Number },
      currentPage: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        max-width: 1280px;
        margin: 0 auto;
      }

      input,
      select,
      button {
        margin: 0.5rem;
      }

      .video-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1rem;
        margin: 1rem;
        background-color: #f7f7f7;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .video-card img {
        width: 128px;
        margin-right: 1rem;
      }

      .video-card h3 {
        margin-top: 0;
      }

      .video-card p {
        margin-bottom: 0;
      }
    `;
  }

  constructor() {
    super();
    this.keyword = '';
    this.sortBy = 'relevance';
    this.videos = [];
    this.totalResults = 0;
    this.currentPage = 1;
  }

  render() {
    return html`
      <div>
        <label for="search">Search:</label>
        <input type="text" id="search" @input=${this.handleInput} />
        <select @change=${this.handleSelect}>
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>
        <button @click=${this.searchVideos}>Search</button>
      </div>
      <div>
        Total results: ${this.totalResults}
      </div>
      <div>
        ${this.videos.map(
          (video) => html`
            <div class="video-card">
              <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">
                <img src=${video.thumbnail} alt=${video.title} />
              </a>
              <div>
                <h3><a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">${video.title}</a></h3>
                <p>${this.sanitizeHtml(video.description)}</p>
              </div>
              <div>Comments: ${video.commentCount}</div>
            </div>
          `
        )}
      </div>
      <pagination-component
        .totalCount=${this.totalResults}
        .hitsPerPage=${10}
        .onPageChange=${this.handlePageChange}
        .currentPage=${this.currentPage}
      ></pagination-component>
    `;
  }

  sanitizeHtml(html) {
    const doc = document.createElement('div');
    doc.innerHTML = html;
    return doc.textContent || doc.innerText;
  }

  handleInput(event) {
    this.keyword = event.target.value;
  }

  handleSelect(event) {
    this.sortBy = event.target.value;
  }

  async searchVideos() {
    const { videos, totalResults } = await YoutubeService.searchVideos(
      this.keyword,
      this.sortBy,
      10,
      (this.currentPage - 1) * 10 + 1
    );
    this.videos = videos;
    this.totalResults = totalResults;
  }

  handlePageChange = (page) => {
    this.currentPage = page;
    this.searchVideos();
  }
}

customElements.define('youtube-data-grid', YoutubeDataGrid);