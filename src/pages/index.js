import {api} from "../utils/constants";
import Place from "../components/Place";
import "./index.css";

const allPlaces = document.querySelector('.places');
const formShowButton = document.querySelector('.add-new-place');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form');
const formCloseButton = form.querySelector('.form__close-button');
const formSubmitButton = form.querySelector('.form__button');
const progressBar = document.querySelector('.toolbar__progress-bar');
const toolbarCategories = document.querySelector('.toolbar__categories');
const loaderScreen = document.querySelector('.loader');


formShowButton.addEventListener('click', _ =>{
  formSubmitButton.innerText = 'Добавить';
  formContainer.classList.add('form-container_opened');
});

formCloseButton.addEventListener('click', _ =>{
  formContainer.classList.remove('form-container_opened');
});

form.addEventListener('submit', evt =>{
  evt.preventDefault();
  formSubmitButton.innerText = 'Сохранение...';
  api.postRequest('Main', getFormValues()).then( _ => {
    initPage().then(_ =>{
      formContainer.classList.remove('form-container_opened');
      form.reset();
    });
  })
});

function initPage() {
  loaderScreen.classList.add('loader_active');
  return api.getFullPage('Main').then( res => {
    allPlaces.textContent = '';
    toolbarCategories.textContent = '';
    setProgress(res);
    initCards(res);
    initCategories(getCategories(res));
    loaderScreen.classList.remove('loader_active');
  });
}

function deletePlace(row) {
  loaderScreen.classList.add('loader_active');
  return api.postRequest('Main', {method: 'delete', row: row}).then( _ => {
    initPage();
    loaderScreen.classList.remove('loader_active');
  })
}

function updateVisited(row,value) {
  loaderScreen.classList.add('loader_active');
  return api.postRequest('Main', {method: 'update', row: row, visited : value}).then( _ =>{
    initPage();
    loaderScreen.classList.add('loader_active');
  })
}

function setProgress(data) {
  const completed = data.filter(el => el[3] === true).length;
  const all = data.length;
  progressBar.style.width = `${completed/all*100}%`;
  progressBar.innerText = `${Math.floor(completed/all*100)}%`
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

initPage();