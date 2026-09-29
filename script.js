// document.querySelector('.burger-menu').addEventListener('click', function() {
//     this.classList.toggle('active');
//     document.querySelector('.nav').classList.toggle('open');
// })

const themeToggle = document.querySelector('.theme-toggle');
const themeStorageKey = 'coffee-house-theme';

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
}

applyTheme(localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
});

const burgerButton = document.querySelector('.burger-menu');
const mainNav = document.querySelector('.header__main-nav');
const mobileMenuQuery = window.matchMedia('(max-width: 768px)');

function setMenuOpen(isOpen) {
    burgerButton.classList.toggle('active', isOpen);
    burgerButton.setAttribute('aria-expanded', String(isOpen));
    burgerButton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu',
    );
    mainNav.classList.toggle('header__main-nav_disabled', !isOpen);
    mainNav.inert = mobileMenuQuery.matches && !isOpen;
    document.body.classList.toggle('no-scroll', mobileMenuQuery.matches && isOpen);
}

setMenuOpen(false);

burgerButton.addEventListener('click', () => {
    setMenuOpen(!burgerButton.classList.contains('active'));
});

mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        if (mobileMenuQuery.matches) setMenuOpen(false);
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && burgerButton.classList.contains('active')) {
        setMenuOpen(false);
        burgerButton.focus();
    }
});

mobileMenuQuery.addEventListener('change', (event) => {
    if (!event.matches) setMenuOpen(false);
});
