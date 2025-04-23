import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChartV1 {
  subElements = {};

  constructor(props = {}) {
    const {
      url = '',
      range = {
        from: new Date(),
        to: new Date()}
    } = props;
    super(props);

    this.url = `${BACKEND_URL}/${url}`;
    this.range = range;

    if (range.from && range.to) {
      this.update(range.from, range.to);
    }

    this.selectSubElements();
  }

  // Main
  async update(from, to) {
    const data = await this.loadData(from, to);
    super.update(Object.values(data));

    this.subElements.header.innerHTML = this.formatHeading(this.value);
    this.subElements.body.innerHTML = this.createChartTemplate();
    return data;
  }

  // Fetch data
  async loadData(from, to) {
    this.isLoadingByClass(true);
    try {
      const url = this.getUrlByRangeDate(from, to);
      return await fetchJson(url.href);
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingByClass(false);
    }
  }

  // Utils
  getUrlByRangeDate(from, to) {
    const url = new URL(this.url);
    url.searchParams.set('from', from.toISOString());
    url.searchParams.set('to', to.toISOString());
    return url;
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  isLoadingByClass(flag) {
    if (flag) {
      this.element.classList.add('column-chart_loading');
    } else {
      this.element.classList.remove('column-chart_loading');
    }
  }
}
