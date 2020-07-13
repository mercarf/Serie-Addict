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
  const clicked = ev.currentTarget;
  const clickedId = parseInt(ev.currentTarget.id);
  console.log(clickedId);

  //Buscamos indice de la serie clickada
  const indexSerie = searchSeries.findIndex(
    (productItem) => productItem.show.id === clickedId
  );
  //Buscamos serie clickada
  const clickedSerie = searchSeries.find(
    (productItem) => productItem.show.id === clickedId
  );
  // podriamos utilizar find index para buscar la posición del elemento a borrar
  const indexFav = favSeries.findIndex(
    (productItem) => productItem.show.id === clickedId
  );
  console.log(indexFav);

  favSeries.splice(indexFav, 1);

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

/* PINTAR CON DOM AVANZADO */
/*     //Elemento li
    const liFav = document.createElement('li');
    liFav.classList.add('fav');
    liFav.classList.add('js-fav');
    liFav.setAttribute('id', serie.id);
    //Elemento div
    const liContainer = document.createElement('div');
    liContainer.classList.add('fav__container');
    liFav.appendChild(liContainer);
    //Elemento h3
    const liFavTitle = document.createElement('h3');
    liFavTitle.classList.add('fav__title');
    const liFavTitleContent = document.createTextNode(serie.name);
    liFavTitle.appendChild(liFavTitleContent);
    liFavTitle.setAttribute('id', serie.id);
    liContainer.appendChild(liFavTitle);
    //Elemento i
    const liFavIcon = document.createElement('i');
    liFavIcon.classList.add('far');
    liFavIcon.classList.add('fa-trash-alt');
    liContainer.appendChild(liFavIcon);
    //Elemento img
    const liFavImg = document.createElement('img');
    liFavImg.classList.add('js-fav__img');
    if (serie.image !== null) {
      liFavImg.setAttribute('src', serie.image.medium);
    } else {
      liFavImg.setAttribute('src', defaultImage);
    }
    liFavImg.setAttribute('alt', `Serie ${serie.name}`);
    liFavImg.setAttribute('id', serie.id);
    liFav.appendChild(liFavImg);*/
