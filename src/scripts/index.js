/**
 * Represents the header element.
 * @type {HTMLElement | null}
 */
const header = document.querySelector('.header');
/**
 * Represents the navigation element within the header.
 * @type {HTMLElement | null}
 */
const headerNav = document.querySelector('.header__navigation');
/**
 * Represents the burger menu button within the header.
 * @type {HTMLButtonElement | null}
 */
const burgerMenu = document.querySelector('.header__burger');

/**
 * Represents a collection of header links within the navigation.
 * @type {NodeListOf<HTMLAnchorElement>}
 */
const links = headerNav.querySelectorAll('.header__link');

/**
 * @typedef {Object.<string, string>} StyleData - object with css classes
 */

/**
 * @type StyleData
 */
const handleScrollData = {
  beforeAnimationClass: 'fade-in-animation_before',
  afterAnimationClass: 'fade-in-animation_after',
  activeLinkClass: 'header__link_active',
}

/**
 * @type StyleData
 */
const handleBurgerMenuClickData = {
  headerExtendedClass: 'header_extended',
  burgerMenuOpenedClass: 'header__burger_opened',
}

/**
 * Checks whether an element is in the visible area of the screen.
 *
 * @param {Element} el - The HTML element to be checked.
 * @returns {boolean} Returns true if the element is fully or partially visible on the screen, and false otherwise.
 */
const isElementInViewport = (el) => {
  /**
   * Gets the coordinates and dimensions of the element relative to the visible part of the screen.
   *
   * @type {DOMRect}
   */
  const rect = el.getBoundingClientRect();
  /**
   * Height of the visible part of the browser window.
   *
   * @type {number}
   */
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  /**
   * Flag indicating whether the element is fully visible.
   *
   * @type {boolean}
   */
  const isFullyVisible = rect.top >= 0 && rect.bottom <= windowHeight;
  /**
   * Flag indicating whether the element is partially visible (at least half).
   *
   * @type {boolean}
   */
  const isPartiallyVisible = (rect.top < windowHeight / 2 && rect.bottom >= windowHeight / 2) || (rect.top >= 0 && rect.top < windowHeight / 2);
  /**
   * Returns true if the element is fully or partially visible on the screen.
   *
   * @type {boolean}
   */
  return isFullyVisible || isPartiallyVisible;
}

/**
 * Handles scroll events and updates the styling of navigation links based on the visibility of target elements.
 *
 * @param {HTMLAnchorElement[]} linksArr - An array of HTML anchor elements representing navigation links.
 * @param {StyleData} data - Configuration data object with classnames.
 *   @property {string} beforeAnimationClass - Class to be replaced before animation.
 *   @property {string} afterAnimationClass - Class to be applied after animation.
 *   @property {string} activeLinkClass - Class to be added to the active link.
 */
const handleScroll = (linksArr, data) => {
  const {
    beforeAnimationClass,
    afterAnimationClass,
    activeLinkClass
  } = data;

  /**
   * Iterates over each navigation link and updates the styling based on the visibility of target elements.
   */
  linksArr.forEach((link) => {
    /**
     * Extracting href attribute from the link.
     * @type {string}
     */
    const linkHref = link.getAttribute('href');

    /**
     * Checking if the link points to an element on the page.
     */
    if (linkHref.startsWith('#')) {
      /**
       * Extracting the target element's ID from the href.
       * @type {string}
       */
      const targetId = linkHref.substring(1); // Remove # from href
      const targetElement = document.getElementById(targetId);

      if (isElementInViewport(targetElement)) {

        /**
         * Updating classes based on animation states.
         */
        if (targetElement.classList.contains(beforeAnimationClass)) {
          targetElement.classList.replace(beforeAnimationClass, afterAnimationClass);
        }
        link.classList.add(activeLinkClass);
      } else {
        /**
         * Removing active class if the target element is not in the viewport.
         */
        link.classList.remove(activeLinkClass);
      }
    }
  });
};

/**
 * Handles click events on the burger menu.
 * 
 * @param {StyleData} data Configuration data object with classnames.
 *  @property {string} headerExtendedClass Class to toggle on the header for extended styling.
 *  @property {string} burgerMenuOpenedClass Class to toggle on the burger menu when opened.
 */
const handleBurgerMenuClick = (data) => {
  const {
    headerExtendedClass,
    burgerMenuOpenedClass,
  } = data;

  header.classList.toggle(headerExtendedClass);
  burgerMenu.classList.toggle(burgerMenuOpenedClass);
}

// const handleBurgerMenuClick = () => {
//   headerNav.classList.toggle('header__navigation_visible');
//   burgerMenu.classList.toggle('header__burger_opened');
// }

document.addEventListener('DOMContentLoaded', () => {
  burgerMenu.addEventListener('click', () => handleBurgerMenuClick(handleBurgerMenuClickData));
  window.addEventListener('scroll', () => handleScroll(links, handleScrollData));
});
