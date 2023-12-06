const headerNav = document.querySelector('.header__navigation');
const links = headerNav.querySelectorAll('.header__link');

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const isFullyVisible = rect.top >= 0 && rect.bottom <= windowHeight;

  // Условие для секции "в процессе" прокрутки (хотя бы половина видна)
  const isPartiallyVisible = (rect.top < windowHeight / 2 && rect.bottom >= windowHeight / 2) || (rect.top >= 0 && rect.top < windowHeight / 2);

  return isFullyVisible || isPartiallyVisible;
}

// Обработчик события прокрутки страницы
const handleScroll = (linksArr) => {
  linksArr.forEach((link) => {
    const targetId = link.getAttribute('href').substring(1); // Убираем # из href
    const targetElement = document.getElementById(targetId);
    console.log(isElementInViewport(targetElement))
    if (isElementInViewport(targetElement)) {
      link.classList.add('header__link_active');
    } else {
      link.classList.remove('header__link_active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Добавляем обработчик события прокрутки
  window.addEventListener('scroll', () => handleScroll(links));
});
