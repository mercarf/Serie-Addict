'use strict';

//Arrays donde meteremos la lista de series buscada, y la lista de series favoritas
let searchSeries = [];
let favSeries = [];

//Constantes
const inputSearch = document.querySelector('.js-input-search');
const buttonSearch = document.querySelector('.js-button-search');

// api

const getDataFromApi = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=girls`)
    .then((response) => response.json())
    .then((data) => {
      searchSeries = data;
    });
};

//Paint
const paintSeriesSearch = () => {
  let codeHTML = '';
  for (let serieData of searchSeries) {
    const serie = serieData.show;
    if (serie.image === null) {
      serieImage.src = defaultImage;
    }
    codeHTML += `<li class="serie">`;
    codeHTML += `<h2 id="${serie.id}" class="serie__title">${serie.name}</h2>`;
    codeHTML += `<img src="${serie.image.medium}" id="${serie.id}" class="serie__img" alt="Serie ${serie.name}" />`;
    codeHTML += `<p class="serie__summary">${serie.summary}</p>`;
    codeHTML += `</li>`;
  }
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  const serieImage = document.querySelector('.serie__img');
  const listSeries = document.querySelector('.js-list-series');
  listSeries.innerHTML = codeHTML;
};

//-----------------LOCAL STORAGE------------------------------

// listener
function handleButtonClick(ev) {
  ev.preventDefault();
  console.log('Han pulsado el botón');
  console.log(paintSeriesSearch());
  paintSeriesSearch();
  console.log(searchSeries);
}

buttonSearch.addEventListener('click', handleButtonClick);

// start app

getDataFromApi();
