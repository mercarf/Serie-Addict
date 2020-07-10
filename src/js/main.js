'use strict';

//Arrays donde meteremos la lista de series buscada, y la lista de series favoritas
let searchSeries = [];
let favSeries = [];

//Constantes
const form = document.querySelector('.form-search');

// api

const getDataFromApi = (ev) => {
  const inputSearchValue = document.querySelector('.js-input-search').value;
  ev.preventDefault();
  console.log('Han pulsado el botón');
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSearchValue}`)
    .then((response) => response.json())
    .then((data) => {
      searchSeries = data;
      paintSeriesSearch();
    });
};

//Paint
const paintSeriesSearch = () => {
  const listSeries = document.querySelector('.js-list-series');
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  let codeHTML = '';
  for (let serieData of searchSeries) {
    const serie = serieData.show;

    codeHTML += `<li class="serie js-serie" id="${serie.id}">`;
    codeHTML += `<h2 id="${serie.id}" class="serie__title">${serie.name}</h2>`;
    if (serie.image !== null) {
      codeHTML += `<img src="${serie.image.medium}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
    } else {
      codeHTML += `<img src="${defaultImage}" id="${serie.id}" class="serie__img" alt="Serie ${serie.name}" />`;
    }
    codeHTML += `<p class="serie__summary" id="${serie.id}">${serie.summary}</p>`;
    codeHTML += `</li>`;
    listSeries.innerHTML = codeHTML;
  }
  listenProductsClicks();
};

const paintSeriesFav = () => {
  const listFav = document.querySelector('.js-list-favorites');
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  let codeHTML = '';
  for (let serieData of favSeries) {
    const serie = serieData.show;

    codeHTML += `<li class="serie js-serie" id="${serie.id}">`;
    codeHTML += `<h2 id="${serie.id}" class="serie__title">${serie.name}</h2>`;
    if (serie.image !== null) {
      codeHTML += `<img src="${serie.image.medium}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
    } else {
      codeHTML += `<img src="${defaultImage}" id="${serie.id}" class="serie__img" alt="Serie ${serie.name}" />`;
    }
    codeHTML += `</li>`;
    listFav.innerHTML = codeHTML;
  }
};

//-------------------FAVORITES-----------------------

const handleSerieClick = (ev) => {
  // obtenemos el id del producto clickado
  const clickedId = parseInt(ev.currentTarget.id);
  // buscamos con find
  const serie = searchSeries.find(
    (productItem) => productItem.show.id === clickedId
  );
  console.log(serie);
  favSeries.push(serie);
  paintSeriesFav();
};
//-----------------LOCAL STORAGE------------------------------

// listener

const listenProductsClicks = () => {
  const seriesAll = document.querySelectorAll('.js-serie');
  for (let index = 0; index < seriesAll.length; index++) {
    const productsBtn = seriesAll[index];
    productsBtn.addEventListener('click', handleSerieClick);
  }
};

form.addEventListener('submit', getDataFromApi);

// start app
