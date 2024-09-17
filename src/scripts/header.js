export class Header {
  constructor({
    headerSelector,
    headerExtendedClass,
    burgerSelector,
    burgerOpenedClass,
    linkActiveClass
  }) {
    this.headerSelector = headerSelector;
    this.headerExtendedClass = headerExtendedClass;
    this.burgerSelector = burgerSelector;
    this.burgerOpenedClass = burgerOpenedClass;
    this.linkActiveClass = linkActiveClass;

    this._init()
  }

  _collectLinks() {
    const links = this.headerElement.querySelectorAll('a[href^="#"]');

    // Result array to store the link and target objects
    this.linksAndTargets = [];

    links.forEach(link => {
      const href = link.getAttribute('href');

      // Get the target element by ID, stripping off the '#' from href
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      // Only add to result if the target element exists
      if (targetElement) {
        this.linksAndTargets.push({
          link: link,     // Link element
          target: targetElement  // Target element with the corresponding ID
        });
      }
    });
  }

  _isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const isFullyVisible = rect.top >= 0 && rect.bottom <= windowHeight;

    const isPartiallyVisible = (rect.top < windowHeight / 2 && rect.bottom >= windowHeight / 2) || (rect.top >= 0 && rect.top < windowHeight / 2);

    return isFullyVisible || isPartiallyVisible;
  }

  _handleLinksScroll = () => {
    this.linksAndTargets.forEach(i => {
      const {
        link,
        target
      } = i;

      if (this._isElementInViewport(target)) {
        link.classList.add(this.linkActiveClass);
      } else {
        link.classList.remove(this.linkActiveClass);
      }
    })
  }

  _handleBurgerMenuClick = () => {
    this.headerElement.classList.toggle(this.headerExtendedClass);
    this.burgerElement.classList.toggle(this.burgerOpenedClass);
  }

  _setupEventListeners() {
    this.burgerElement.addEventListener('click', this._handleBurgerMenuClick);
    window.addEventListener('scroll', this._handleLinksScroll);
  }

  _init() {
    this.headerElement = document.querySelector(this.headerSelector);
    this.burgerElement = this.headerElement.querySelector(this.burgerSelector);

    this._collectLinks();
    this._setupEventListeners();
  }
}
