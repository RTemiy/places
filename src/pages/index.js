import {api} from "../utils/constants";
import Place from "../components/Place";
import "./index.css"

Promise.all([api.getFullPage('Main'),api.getFullPage('Custom')]).then(res =>{
  res.forEach(block => block.forEach(element => new Place(element)));
})

const formShowButton = document.querySelector('.add-new-place');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form');
const formCloseButton = form.querySelector('.form__close-button');
const formSubmitButton = form.querySelector('.form__button');

formShowButton.addEventListener('click', _ =>{
  formContainer.classList.add('form-container_opened');
  form.reset();
});

formCloseButton.addEventListener('click', _ =>{
  formContainer.classList.remove('form-container_opened');
});

form.addEventListener('submit', evt =>{
  evt.preventDefault();
  formSubmitButton.innerText = 'Сохранение...';
  const data = {
    icon: form.icon.value,
    name: form.name.value,
    description: form.description.value,
    visited: false,
  }
  api.postPlace('Custom', data).then( _ =>{
    new Place([form.icon.value,form.name.value, form.description.value,false]);
    formContainer.classList.remove('form-container_opened');
  })

})