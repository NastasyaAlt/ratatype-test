// function to set a given theme/color-scheme

 function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
}
// function to toggle between light and dark theme


const switchModeBtn = document.getElementById('switch-mode');

switchModeBtn.addEventListener('click', function() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
});

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
     
    }
})();


const dropdownBtn = document.querySelector('.js-header-dropdown');
dropdownBtn.addEventListener('click', function() {
	document.querySelector('.js-subnav').classList.toggle('show');
})

const btnBurgerOpen = document.querySelector('.js-burger-open');
const menuBurger = document.querySelector('.js-mobile');
const btnBurgerClose = document.querySelector('.js-buger-close');

btnBurgerOpen.addEventListener('click', function() {
	menuBurger.classList.add('active');
});

btnBurgerClose.addEventListener('click', function() {
	menuBurger.classList.remove('active');
});