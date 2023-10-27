export default class GoogleAppScriptAPI {
  #link
  constructor(link) {
    this.#link = link
  }

  getFullPage(pageName){
    return fetch(`${this.#link}?sheetName=${pageName}`,).then(res=>{
      return res.json()})
  }

  postRequest(pageName, data){
    let allData = '';
    for(let prop in data){
      allData += `&${prop}=${data[prop]}`;
    }
    return fetch(`${this.#link}?sheetName=${pageName}${allData}`,{
    method: 'POST',
    })
  }
}