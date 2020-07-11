/* eslint-disable strict */
const arrowTransform = document.querySelector('.js-arrowTransform');
const arrowMenu = document.querySelector('.js-arrow');
const collapsibleHidden = document.querySelector('.js-hidden');
console.log(arrowTransform);

function changeCollapsible() {
  collapsibleHidden.classList.toggle('hidden');
  arrowTransform.classList.toggle('transform');
}

arrowMenu.addEventListener('click', changeCollapsible);
