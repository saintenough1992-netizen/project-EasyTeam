const headerMenuButton = document.querySelector('.header-burger-btn');
const headerMenuButtonIconUse = document.querySelector(
  '.header-menu-icon > use'
);
const header = document.querySelector('.header');

const toggleMenu = () => {
  const isMobileMenuOpen = header.classList.toggle('mobile-menu-open');
  headerMenuButton.ariaLabel = isMobileMenuOpen
    ? 'Close navigation menu'
    : 'Open navigation menu';
  const useElementHref = headerMenuButtonIconUse.getAttribute('href');
  const [basePath] = useElementHref.split('#');
  headerMenuButtonIconUse.setAttribute(
    'href',
    [basePath, isMobileMenuOpen ? 'icon-close' : 'icon-burger'].join('#')
  );
  document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
};

headerMenuButton.addEventListener('click', () => {
  toggleMenu();
});

header.addEventListener('click', e => {
  const isMobileMenuOpen = header.classList.contains('mobile-menu-open');
  const isMenuItemClicked = e.target.classList.contains('header-nav-link');
  if (isMobileMenuOpen && isMenuItemClicked) {
    toggleMenu();
  }
});
