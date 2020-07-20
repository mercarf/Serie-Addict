/* eslint-disable strict */
//Funcion que pinta las series (titulo, imagen y resumen)

let languages = ['English', 'Spanish', 'Portuguese'];

const paintSeriesSearch = () => {
  const listSeries = document.querySelector('.js-list-series');
  const defaultImage =
    'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

  for (let serieData of searchSeries) {
    const serie = serieData.show;
    let summary = serie.summary || 'No hay informacion sobre esta serie';
    //Elemento li
    const li = document.createElement('li');
    li.classList.add('serie');
    li.classList.add('js-serie');
    li.setAttribute('id', serie.id);
    //Elemento h2
    const liTitle = document.createElement('h2');
    liTitle.classList.add('serie-title');
    const liTitleContent = document.createTextNode(serie.name);
    liTitle.appendChild(liTitleContent);
    liTitle.setAttribute('id', serie.id);
    li.appendChild(liTitle);
    //Elemento img
    const liImg = document.createElement('img');
    liImg.classList.add('js-serie__img');
    if (serie.image !== null) {
      liImg.setAttribute('src', serie.image.medium);
    } else {
      liImg.setAttribute('src', defaultImage);
    }
    liImg.setAttribute('alt', `Serie ${serie.name}`);
    liImg.setAttribute('id', serie.id);
    li.appendChild(liImg);
    //Elemento idioma
    const lip = document.createElement('p');
    const lipContent = document.createTextNode(serie.language);
    lip.appendChild(lipContent);
    li.appendChild(lip);

    const indexLanguage = languages.indexOf(serie.language);
    console.log(indexLanguage);
    if (indexLanguage !== -1) {
      const lip2 = document.createElement('p');
      const lipContent = document.createTextNode('Recomendado');
      lip2.appendChild(lipContent);
      li.appendChild(lip2);
    }

    //Elemento div
    const liText = document.createElement('div');
    liText.innerHTML = summary;
    liText.classList.add('js-serie-summary');
    liText.setAttribute('id', serie.id);
    li.appendChild(liText);
    //Lo metemos todo dentro del ul
    listSeries.appendChild(li);
  }
  listenProductsClicks();
  inputSearch.value = '';
};

// Lo que ocurre al clicar en las series
const handleSerieClick = (ev) => {
  //Obtenemos el elemento clickado
  const clicked = ev.currentTarget;
  //Obtenemos el id del producto clickado
  const clickedId = parseInt(ev.currentTarget.id);
  //Buscamos con find la serie clickada
  const clickedSerie = searchSeries.find(
    (productItem) => productItem.show.id === clickedId
  );
  //Buscamos con find el favorito clickada
  const clickedFav = favSeries.find(
    (productItem) => productItem.show.id === clickedId
  );
  //Buscamos el indice del favorito
  const index = favSeries.findIndex(
    (productItem) => productItem.show.id === clickedId
  );

  //Si el favorito es undefined(no se encuentra)
  if (clickedFav === undefined) {
    favSeries.push(clickedSerie);
    //A la serie clickada le añadimos la clase
    clicked.classList.add('favorite');
  } else {
    favSeries.splice(index, 1);
    clicked.classList.remove('favorite');
  }

  console.log(clickedSerie);
  paintSeriesFav();
  updateLocalStorage();
};

const handleLogClick = () => {
  console.log(`Tienes ${favSeries.length} favoritos`);
};

const logBtn = document.querySelector('.js-log-btn');

logBtn.addEventListener('click', handleLogClick);

// Funcion manejadora/Evento click de las series
const listenProductsClicks = () => {
  const seriesAll = document.querySelectorAll('.js-serie');
  for (let index = 0; index < seriesAll.length; index++) {
    const serieFind = seriesAll[index];
    serieFind.addEventListener('click', handleSerieClick);
  }
};

/* PINTAR CON INNERHTML */
//FUERA DEL FOR
// let codeHTML = '';
//DENTRO DEL FOR
// codeHTML += `<li class="serie js-serie" id="${serie.id}">`;
// codeHTML += `<h2 id="${serie.id}" class="serie__title">${serie.name}</h2>`;
// if (serie.image !== null) {
//   codeHTML += `<img src="${serie.image.medium}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
// } else {
//   codeHTML += `<img src="${defaultImage}" id="${serie.id}" class="js-serie__img" alt="Serie ${serie.name}" />`;
// }
// codeHTML += `<div class="serie-summary" id="${serie.id}">${summary}</div>`;
// codeHTML += `</li>`;
// listSeries.innerHTML = codeHTML;
