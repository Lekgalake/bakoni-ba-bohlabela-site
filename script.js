const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const header = document.querySelector('.site-header');
const menuLabel = 'Bula lenaneo';
const closeLabel = 'Tswalela lenaneo';
const mobileMenu = window.matchMedia('(max-width: 860px)');

function setMenuOpen(open, returnFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? closeLabel : menuLabel);
  navigation.classList.toggle('open', open);
  if (!open && returnFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false, true));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (mobileMenu.matches && !header.contains(event.target) && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
  }
});

mobileMenu.addEventListener('change', (event) => {
  if (!event.matches) setMenuOpen(false);
});

const navLinks = [...navigation.querySelectorAll('a')];
const sectionNav = new Map(navLinks.map((link) => [link.hash.slice(1), link]));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = sectionNav.get(entry.target.id);
    if (entry.isIntersecting && link) {
      navLinks.forEach((item) => item.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'location');
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
