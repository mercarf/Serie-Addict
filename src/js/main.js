'use strict';

//Arrays donde meteremos la lista de series buscada, y la lista de series favoritas
let searchSeries = [];
let favSeries = [];

//Constantes
const form = document.querySelector('.form-search');
const inputSearch = document.querySelector('.js-input-search');
const errorMessage = document.querySelector('.js-error-message');
const listSeries = document.querySelector('.js-list-series');
const listFav = document.querySelector('.js-list-favorites');

// api

const getDataFromApi = (ev) => {
  const inputSearchValue = inputSearch.value;
  ev.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSearchValue}`)
    .then((response) => response.json())
    .then((data) => {
      searchSeries = data;
      if (inputSearchValue !== '') {
        paintSeriesSearch();
        errorMessage.innerHTML = '';
      } else {
        paintError();
      }
    });
};

//Paint
function paintError() {
  errorMessage.innerHTML = 'No has introducido nintun dato';
  listSeries.innerHTML = '';
}

const paintSeriesSearch = () => {
  const listSeries = document.querySelector('.js-list-series');
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  let codeHTML = '';

  for (let serieData of searchSeries) {
    const serie = serieData.show;
    let summary = serie.summary || 'No hay informacion sobre esta serie';

    codeHTML += `<li class="serie js-serie" id="${serie.id}">`;
    codeHTML += `<h2 id="${serie.id}" class="serie__title">${serie.name}</h2>`;
    if (serie.image !== null) {
      codeHTML += `<img src="${serieData.show.image.medium}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
    } else {
      codeHTML += `<img src="${defaultImage}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
    }
    codeHTML += `<div class="serie-summary" id="${serie.id}">${summary}</div>`;
    codeHTML += `</li>`;
    listSeries.innerHTML = codeHTML;
  }
  listenProductsClicks();
  inputSearch.value = '';
};

const paintSeriesFav = () => {
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  let codeHTML = '';
  for (let serieData of favSeries) {
    const serie = serieData.show;

    codeHTML += `<li class="fav js-fav" id="${serie.id}">`;
    codeHTML += `<h2 id="${serie.id}" class="fav__title">${serie.name}</h2>`;
    if (serie.image !== null) {
      codeHTML += `<img src="${serie.image.medium}" id="${serie.id}" class="js-fav__img" alt="Serie ${serie.name}" />`;
    } else {
      codeHTML += `<img src="${defaultImage}" id="${serie.id}" class="fav__img" alt="Serie ${serie.name}" />`;
    }
    codeHTML += `</li>`;
    listFav.innerHTML = codeHTML;
  }
  listenFavsClicks();
};

//-------------------FAVORITES-----------------------

//cuando hacemo click en el listado de series
const handleSerieClick = (ev) => {
  // obtenemos el id del producto clickado
  const clickedId = parseInt(ev.currentTarget.id);
  // buscamos con find
  const serieFind = searchSeries.find(
    (productItem) => productItem.show.id === clickedId
  );
  const index = favSeries.findIndex(
    (productItem) => productItem.show.id === clickedId
  );
  const seriesclick = ev.currentTarget;
  seriesclick.classList.toggle('favorite');

  const seriefav = favSeries.find(
    (productItem) => productItem.show.id === clickedId
  );

  if (seriefav === undefined) {
    favSeries.push(serieFind);
  } else {
    favSeries.splice(index, 1);
  }

  console.log(serieFind);
  paintSeriesFav();
  updateLocalStorage();
};

//Cuando hacemos click en los favoritos
const handleFavsClick = (ev) => {
  const clickedId = parseInt(ev.currentTarget.id);
  console.log(clickedId);
  // podriamos utilizar find index para buscar la posición del elemento a borrar
  const index = favSeries.findIndex(
    (productItem) => productItem.show.id === clickedId
  );
  console.log(index);

  favSeries.splice(index, 1);
  updateLocalStorage();
  paintSeriesFav();
};

//----------------- LOCAL STORAGE ------------------------------

const updateLocalStorage = () => {
  localStorage.setItem('Favorites', JSON.stringify(favSeries));
};

const getFromLocalStorage = () => {
  const saveFavorites = JSON.parse(localStorage.getItem('Favorites'));
  if (saveFavorites !== null) {
    favSeries = saveFavorites;
    paintSeriesFav(); //Cuando tengamos favoritos guardados en LS aparecerán al refrescar en la lista de favoritos
  }
};
//------------------- Reset ------------------------------

const btnReset = document.querySelector('.js-reset-btn');

const resetCart = () => {
  favSeries = [];
  updateLocalStorage();
  listFav.innerHTML = '';
  paintSeriesFav();
};

btnReset.addEventListener('click', resetCart);

// listener

const listenProductsClicks = () => {
  const seriesAll = document.querySelectorAll('.js-serie');
  for (let index = 0; index < seriesAll.length; index++) {
    const serieFind = seriesAll[index];
    serieFind.addEventListener('click', handleSerieClick);
  }
};

const listenFavsClicks = () => {
  const favsAll = document.querySelectorAll('.js-fav');
  for (let index = 0; index < favsAll.length; index++) {
    const serieFav = favsAll[index];
    serieFav.addEventListener('click', handleFavsClick);
  }
};

form.addEventListener('submit', getDataFromApi); //Se ejecuta al hacer un submit en el formulario (no solo con click en el boton sino al pulsar enter tambien)

// start app
getFromLocalStorage(); //se ejecuta al iniciar la página
