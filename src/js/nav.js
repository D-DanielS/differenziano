var consulta = window.matchMedia('(max-width: 1024px)');
consulta.addListener(mediaQuery);

var $burguerButton = document.getElementById('iconMenu');
var $menu = document.getElementById('menu');

function toggleMenu() {
  $menu.classList.toggle('menu-show');
}

function showMenu() {
  $menu.classList.add('menu-show');
}


function hideMenu() {
  $menu.classList.remove('menu-show');
}


function mediaQuery() {
  if (consulta.matches) {
    $burguerButton.addEventListener('click', toggleMenu);
  } else {
    $burguerButton.removeEventListener('click', toggleMenu);
  }
}




mediaQuery();
$('#iconMenu').on('click', function () {
  
  $('.nav__movil').toggleClass('click-color');
});