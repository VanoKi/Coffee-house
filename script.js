// document.querySelector('.burger-menu').addEventListener('click', function() {
//     this.classList.toggle('active');
//     document.querySelector('.nav').classList.toggle('open');
// })

const burgIco = document.querySelector('.burger-menu')
const mainNav = document.querySelector('.header__main-nav')
const menu = document.querySelector('.header_menu')
const body = document.querySelector('body')
function toogleBurger() {
    burgIco.classList.toggle('active');
    mainNav.classList.toggle('header__main-nav_disabled');
    menu.classList.toggle('header_menu_disabled');
    body.classList.toggle('no-scroll');
}

burgIco.addEventListener('click', toogleBurger)

