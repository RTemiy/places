export default class Api{
  #link
  constructor(link) {
    this.#link = link
  }

  getFullPage(pageName){
    return fetch(`${this.#link}?sheetName=${pageName}`,).then(res=>{
      return res.json()})
  }

  postPlace(pageName, {icon,name,description}){
    return fetch(`${this.#link}?sheetName=${pageName}&icon=${icon}&name=${name}&description=${description}`,{
    method: 'POST',})
  }

}