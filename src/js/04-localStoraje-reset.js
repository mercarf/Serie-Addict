/* eslint-disable strict */
//----------------- LOCAL STORAGE ------------------------------
// Guardamos en el Local Storage
const updateLocalStorage = () => {
  localStorage.setItem('Favorites', JSON.stringify(favSeries));
};

//Recogemos del Local Storage
const getFromLocalStorage = () => {
  const savedFavorites = JSON.parse(localStorage.getItem('Favorites'));
  if (savedFavorites !== null) {
    favSeries = savedFavorites;
    paintSeriesFav(); //Cuando tengamos favoritos guardados en LS aparecerán al refrescar en la lista de favoritos
  }
};

//------------------- RESET ------------------------------
// Boton reset, para borrar favoritos, Local Storage, series seleccionadas
const btnReset = document.querySelector('.js-reset-btn');

const resetFav = () => {
  favSeries = [];
  updateLocalStorage();
  paintSeriesFav();
};
btnReset.addEventListener('click', resetFav);

// start app
getFromLocalStorage(); //se ejecuta al iniciar la página
