const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const header = document.querySelector('.site-header');
const menuLabel = 'Bula lenaneo';
const closeLabel = 'Tswalela lenaneo';
const mobileMenu = window.matchMedia('(max-width: 860px)');

const galleryToggle = document.querySelector('.gallery-toggle');
const additionalPhotos = document.querySelector('#more-leadership-photos');
if (galleryToggle && additionalPhotos) {
  const galleryLabel = galleryToggle.querySelector('.gallery-toggle-label');
  const galleryIcon = galleryToggle.querySelector('.gallery-toggle-icon');

  galleryToggle.addEventListener('click', () => {
    const isOpening = galleryToggle.getAttribute('aria-expanded') !== 'true';
    if (isOpening) {
      additionalPhotos.querySelectorAll('img[data-src]').forEach((image) => {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
      });
    }

    additionalPhotos.hidden = !isOpening;
    galleryToggle.setAttribute('aria-expanded', String(isOpening));
    galleryLabel.textContent = isOpening ? 'Hide additional pictures' : 'Kgotla mo go bona diswantšho tše dingwe';
    galleryIcon.textContent = isOpening ? '−' : '＋';
  });
}

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
