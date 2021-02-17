'use strict';

//Arrays donde meteremos la lista de series buscada, y la lista de series favoritas
let searchSeries = [];
let favSeries = [];

// Constantes
const form = document.querySelector('.form-search');
const inputSearch = document.querySelector('.js-input-search');
const errorMessage = document.querySelector('.js-error-message');
const listSeries = document.querySelector('.js-list-series');
const listFav = document.querySelector('.js-list-favorites');

// Llamada a la api

const getDataFromApi = (ev) => {
  const inputSearchValue = inputSearch.value;
  ev.preventDefault();
  fetch(`//api.tvmaze.com/search/shows?q=${inputSearchValue}`)
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
// Funcion que pinta un error si el input está vacío al darle a buscar
function paintError() {
  errorMessage.innerHTML = '🔔 No has introducido nintun dato 🔔';
  listSeries.innerHTML = '';
}

//---------------------LISTENERS--------------------------
// Evento al hacer click/Enviar formulario(enter)
form.addEventListener('submit', getDataFromApi);
