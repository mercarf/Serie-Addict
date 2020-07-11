/* eslint-disable strict */
// Funcion que pinta los favoritos (tiutlo, imagen, boton)
const paintSeriesFav = () => {
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  let codeHTML = '';
  for (let serieData of favSeries) {
    const serie = serieData.show;

    codeHTML += `<li class="fav js-fav" id="${serie.id}">`;
    codeHTML += `<div class="fav__container">`;
    codeHTML += `<h3 id="${serie.id}" class="fav__title">${serie.name}</h3>`;
    codeHTML += `<i class="far fa-trash-alt"></i>`;
    codeHTML += `</div>`;
    if (serie.image !== null) {
      codeHTML += `<img src="${serie.image.medium}" id="${serie.id}" class="js-fav__img" alt="Serie ${serie.name}" />`;
    } else {
      codeHTML += `<img src="${defaultImage}" id="${serie.id}" class="js-fav__img" alt="Serie ${serie.name}" />`;
    }
    codeHTML += `</li>`;
    listFav.innerHTML = codeHTML;
  }
  listenFavsClicks();
};

//Lo que ocurre al clicar en los favoritos
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

// Funcion manejadora/Evento click de los favoritos
const listenFavsClicks = () => {
  const favsAll = document.querySelectorAll('.js-fav');
  for (let index = 0; index < favsAll.length; index++) {
    const serieFav = favsAll[index];
    serieFav.addEventListener('click', handleFavsClick);
  }
};
