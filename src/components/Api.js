export default class Api{
  #link;#token;
  constructor({link, token}) {
    this.#link = link;
    this.#token = token;
  }
  getFullPage(pageName){
    return fetch(`${this.#link}/values/${pageName}?alt=json&key=${this.#token}`,{
    }).then(res=>{
      return res.json()})
  }

}