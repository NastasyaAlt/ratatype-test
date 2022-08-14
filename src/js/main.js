// function to set a given theme/color-scheme
/*
window.addEventListener("DOMContentLoaded", function() {
  localStorage.setItem('theme', themeName);
  document.body.className = themeName;
});
*/
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
       // document.getElementById('switch-mode').classList.add = false;
    } else {
        setTheme('theme-light');
      //document.getElementById('switch-mode').checked = true;
    }
})();
