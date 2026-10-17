const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

const navLinks = [...navigation.querySelectorAll('a')];
const sectionNav = new Map(navLinks.map((link) => [link.hash.slice(1), link]));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && sectionNav.has(entry.target.id)) {
      navLinks.forEach((link) => link.classList.remove('active'));
      sectionNav.get(entry.target.id).classList.add('active');
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
