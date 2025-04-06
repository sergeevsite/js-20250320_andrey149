export default class NotificationMessage {
  element;
  static lastShownNotification;

  constructor(text = '', {duration = 0, type = ''} = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement();
  }

  // Templates
  createNotificationTemplate() {
    return `
      <div class="notification ${this.type ?? ''}" style="--value: ${this.duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type ?? ''}</div>
          <div class="notification-body">
            ${this.text}
          </div>
        </div>
      </div>
    `;
  }

  // Main
  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createNotificationTemplate();
    return element.firstElementChild;
  }

  saveLastShownNotification() {
    if (NotificationMessage.lastShownNotification) {
      NotificationMessage.lastShownNotification.hide();
    }
    NotificationMessage.lastShownNotification = this;
  }

  show(container = document.body) {
    this.saveLastShownNotification();

    if (this.duration) {
      this.timerId = setTimeout(() => {
        this.hide();
      }, this.duration);
    }

    container.append(this.element);
  }

  hide() {
    this.destroy();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    clearTimeout(this.timerId);
    this.remove();
  }
}
