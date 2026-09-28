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

const burgIco = document.querySelector('.burger-menu')
const mainNav = document.querySelector('.header__main-nav')
const body = document.querySelector('body')
function toggleBurger() {
    const isOpen = burgIco.classList.toggle('active');
    mainNav.classList.toggle('header__main-nav_disabled', !isOpen);
    body.classList.toggle('no-scroll', isOpen);
}

burgIco.addEventListener('click', toggleBurger)
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (burgIco.classList.contains('active')) toggleBurger();
    });
});

