import { LitElement, html } from 'lit';

export default class PaginationComponent extends LitElement {
  static get properties() {
    return {
      totalCount: { type: Number },
      hitsPerPage: { type: Number },
      onPageChange: { type: Function },
      currentPage: { type: Number },
    };
  }

  constructor() {
    super();
    this.totalCount = 0;
    this.hitsPerPage = 10;
    this.onPageChange = () => {};
    this.currentPage = 1;
  }

  render() {
    const totalPages = Math.ceil(this.totalCount / this.hitsPerPage);
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1);
      }
    } else {
      if (this.currentPage <= 5) {
        for (let i = 0; i < 10; i++) {
          pages.push(i + 1);
        }
      } else if (this.currentPage + 5 > totalPages) {
        for (let i = totalPages - 10 + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(2);
        pages.push('...');
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
    }
    return html`
      <div>
        ${pages.map((page) =>
          page === '...' ? html`<span>...</span>` : html`
            <button
              @click=${() => this.onPageChange(page)}
              ?active=${this.currentPage === page}
            >
              ${page}
            </button>
          `
        )}
      </div>
    `;
  }
}

customElements.define('pagination-component', PaginationComponent);