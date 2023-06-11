export default class Place{
  #icon;#name;#description;#visited;
  #placeContainer= document.createElement('div');
  #placeIcon= document.createElement('p');
  #placeName= document.createElement('p');
  #placeDescription= document.createElement('p');
  constructor({icon, name, description, visited}) {
    this.#icon = icon;
    this.#name = name;
    this.#description = description;
    this.#visited = visited;
    this.createPlace();
  }

  #addContent(){
    this.#placeContainer.classList.add('place');
    if (this.#visited === 'FALSE') this.#placeContainer.classList.add('place_to-visit');
    this.#placeIcon.innerText = this.#icon;
    this.#placeIcon.classList.add('place__icon');
    this.#placeName.innerText = this.#name;
    this.#placeName.classList.add('place__name');
    this.#placeDescription.innerText = this.#description;
    this.#placeDescription.classList.add('place__description');
  }

  #addToDOM(){
    this.#placeContainer.append(this.#placeIcon);
    this.#placeContainer.append(this.#placeName);
    this.#placeContainer.append(this.#placeDescription);
    document.querySelector('.places').append(this.#placeContainer);
  }

  createPlace(){
    this.#addContent();
    this.#addToDOM()
  }
}