import {api} from "../utils/constants";
import Place from "../components/Place";
import "./index.css"

api.getFullPage('Main').then(res =>{ res.forEach((element,index) => new Place(index+1,element,deletePlace,updateVisited));
})

const formShowButton = document.querySelector('.add-new-place');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form');
const formCloseButton = form.querySelector('.form__close-button');
const formSubmitButton = form.querySelector('.form__button');

formShowButton.addEventListener('click', _ =>{
  formContainer.classList.add('form-container_opened');
});

formCloseButton.addEventListener('click', _ =>{
  formContainer.classList.remove('form-container_opened');
});

form.addEventListener('submit', evt =>{
  evt.preventDefault();
  formSubmitButton.innerText = 'Сохранение...';
  api.postRequest('Main', {
    icon: form.icon.value,
    name: form.name.value,
    description: form.description.value,
    visited: false,
  }).then(_ =>{
    location.reload()
  })
})

function deletePlace(row) {
  api.postRequest('Main', {method: 'delete', row: row}).then(_ =>{location.reload()})
}

function updateVisited(row,value) {
  api.postRequest('Main', {method: 'update', row: row, visited : value}).then(_ =>{location.reload()})
}