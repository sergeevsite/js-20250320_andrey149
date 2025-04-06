export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = (value) => value
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.element = this.createElement();
  }

  // Templates
  createLinkTemplate() {
    return this.link
      ? `<a href="${this.link}" class="column-chart__link">View all</a>`
      : '';
  }

  createChartTemplate() {
    const dataProps = this.getColumnProps(this.data);
    return dataProps
      .map(({percent, value}) =>
        `<div style="--value: ${value}" data-tooltip="${percent}"></div>`)
      .join('');
  }

  addChartClasses() {
    return this.data.length
      ? 'column-chart'
      : 'column-chart_loading';
  }

  createTemplate() {
    return `
      <div class="${this.addChartClasses()}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
            ${this.label}
            ${this.createLinkTemplate()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.formatHeading(this.value)}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.createChartTemplate()}
          </div>
        </div>
      </div>
    `;
  }

  // Main
  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  update(newData) {
    this.data = newData;
    const newElement = this.createElement();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  // Utils
  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }
}
