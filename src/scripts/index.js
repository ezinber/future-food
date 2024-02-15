const header = document.querySelector('.header');
const headerNav = document.querySelector('.header__navigation');
const burgerMenu = document.querySelector('.header__burger');
const links = headerNav.querySelectorAll('.header__link');

const handleScrollData = {
  beforeAnimationClass: 'fade-in-animation_before',
  afterAnimationClass: 'fade-in-animation_after',
  activeLinkClass: 'header__link_active',
}

const handleBurgerMenuClickData = {
  headerExtendedClass: 'header_extended',
  burgerMenuOpenedClass: 'header__burger_opened',
}

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const isFullyVisible = rect.top >= 0 && rect.bottom <= windowHeight;

  // Условие для секции "в процессе" прокрутки (хотя бы половина видна)
  const isPartiallyVisible = (rect.top < windowHeight / 2 && rect.bottom >= windowHeight / 2) || (rect.top >= 0 && rect.top < windowHeight / 2);

  return isFullyVisible || isPartiallyVisible;
}

// Обработчик события прокрутки страницы
const handleScroll = (linksArr, data) => {
  const {
    beforeAnimationClass,
    afterAnimationClass,
    activeLinkClass
  } = data;

  linksArr.forEach((link) => {
    const linkHref = link.getAttribute('href');

    if (linkHref.startsWith('#')) {
      const targetId = linkHref.substring(1); // Убираем # из href
      const targetElement = document.getElementById(targetId);

      if (isElementInViewport(targetElement)) {
        if (targetElement.classList.contains(beforeAnimationClass)) {
          targetElement.classList.replace(beforeAnimationClass, afterAnimationClass)
        }
        link.classList.add(activeLinkClass);
      } else {
        link.classList.remove(activeLinkClass);
      }
    }
  });
}

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
  // Добавляем обработчик события прокрутки
  burgerMenu.addEventListener('click', () => handleBurgerMenuClick(handleBurgerMenuClickData));
  window.addEventListener('scroll', () => handleScroll(links, handleScrollData));
});
