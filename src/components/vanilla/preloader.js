const preloader = document.getElementById('preloader');
let savedTheme = localStorage.getItem('calcTheme');

if (!savedTheme) {
   savedTheme = 'light';
}

preloader.classList.add(`loader--${savedTheme}`);

window.addEventListener('load', () => {
   setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
         preloader.remove();
      }, 400);
   }, 500);
});

window.oncontextmenu = function (event) {
   event.preventDefault();
   event.stopPropagation();
   return false;
};
