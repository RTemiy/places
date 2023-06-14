export default class Place{

  #icon;#name;#description;#visited;#row;#delete;#updateVisited;#category
  #placeContainer= document.createElement('div');
  #placeIcon= document.createElement('p');
  #placeName= document.createElement('p');
  #placeDescription= document.createElement('p');
  #placeDelete= document.createElement('p');
  #placeUpdateVisited= document.createElement('p');
  #placeCategory = document.createElement('p');

  constructor(row,data,deletePlace,updateVisited) {
    const {icon, name, description, visited, category} = this.#formCardData(data);
    this.#row = row;
    this.#icon = icon;
    this.#name = name;
    this.#description = description;
    this.#delete = deletePlace;
    this.#updateVisited = updateVisited;
    this.#visited = visited;
    this.#category = category;
    this.createPlace();
  }

  #formCardData(arr) {
    return {
      icon: arr[0],
      name: arr[1],
      description: arr[2],
      visited: arr[3],
      category: arr[4],
    }
  }

  #addContent(){
    this.#placeContainer.classList.add('place');
    if (this.#visited === false) this.#placeContainer.classList.add('place_to-visit');
    this.#placeIcon.innerText = this.#icon;
    this.#placeIcon.classList.add('place__icon');
    this.#placeName.innerText = this.#name;
    this.#placeName.classList.add('place__name');
    this.#placeDescription.innerText = this.#description;
    this.#placeDescription.classList.add('place__description');
    this.#placeDelete.innerText = '🗑';
    this.#placeDelete.classList.add('place__delete');
    this.#placeDelete.addEventListener('click', _ => {this.#handleDelete()})
    this.#placeUpdateVisited.innerText = '✅';
    this.#placeUpdateVisited.classList.add('place__update-visited');
    this.#placeUpdateVisited.addEventListener('click', _ => {this.#handleUpdateVisited()})
    this.#placeCategory.innerText = this.#category;
    this.#placeCategory.classList.add('place__category')
  }

  #handleDelete(){
    this.#delete(this.#row);
    this.#placeContainer.remove();
  }

  #handleUpdateVisited(){
    this.#updateVisited(this.#row,this.#visited = !this.#visited);
  }

  #addToDOM(){
    this.#placeContainer.append(this.#placeIcon);
    this.#placeContainer.append(this.#placeName);
    this.#placeContainer.append(this.#placeDescription);
    this.#placeContainer.append(this.#placeDelete);
    this.#placeContainer.append(this.#placeUpdateVisited);
    this.#placeContainer.append(this.#placeCategory);
    document.querySelector('.places').append(this.#placeContainer);
  }

  createPlace(){
    this.#addContent();
    this.#addToDOM()
  }
}