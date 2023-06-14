import {api} from "../utils/constants";
import Place from "../components/Place";
import "./index.css";

const allPlaces = document.querySelector('.places');
const formShowButton = document.querySelector('.add-new-place');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form');
const formCloseButton = form.querySelector('.form__close-button');
const formSubmitButton = form.querySelector('.form__button');
const progressText = document.querySelector('.toolbar__progress-text');
const progressBar = document.querySelector('.toolbar__progress-bar');
const toolbarCategories = document.querySelector('.toolbar__categories');

api.getFullPage('Main').then(res =>{
  setProgress(res);
  initCards(res);
  initCategories(getCategories(res));
});

formShowButton.addEventListener('click', _ =>{
  formContainer.classList.add('form-container_opened');
});

formCloseButton.addEventListener('click', _ =>{
  formContainer.classList.remove('form-container_opened');
});

form.addEventListener('submit', evt =>{
  evt.preventDefault();
  formSubmitButton.innerText = 'Сохранение...';
  api.postRequest('Main', getFormValues()).then(_ =>{
    location.reload()
  })
})

function deletePlace(row) {
  api.postRequest('Main', {method: 'delete', row: row}).then(_ =>{location.reload()})
}

function updateVisited(row,value) {
  api.postRequest('Main', {method: 'update', row: row, visited : value}).then(_ =>{location.reload()})
}

function setProgress(data) {
  const completed = data.filter(el => el[3] === true).length;
  const all = data.length;

  progressText.innerText = `${completed}/${all}`;
  progressBar.style.width = `${completed/all*100}%`;
}

function initCards(data) {
  data.forEach((element,index) => new Place(index+1,element,deletePlace,updateVisited));
}

function getCategories(data) {
  const allData = new Set();
  data.forEach(el => allData.add(el[4]));
  return [...allData];
}

function initCategories(data){
  data.forEach(el=>{
    const element = document.createElement('button');
    element.innerText = el;
    element.classList.add('toolbar__category');
    element.addEventListener('click', _ =>{
      showCategory(el);
    });
    toolbarCategories.append(element);
  })
}

function showCategory(category){
  allPlaces.querySelectorAll('.place').forEach(el => {
    if (el.querySelector('.place__category').innerText === category) el.classList.remove('place_hidden');
    else el.classList.add('place_hidden');
  })
}

function getFormValues() {
  return {
    icon: form.icon.value,
    name: form.name.value,
    description: form.description.value,
    visited: false,
    category : form.category.value
  }
}