import {api} from "../utils/constants";
import Place from "../components/Place";
import "./index.css"

api.getFullPage('Main').then(res => res.values.forEach(element => new Place(formCardData(element))));
api.getFullPage('places').then(res => res.values.forEach(element => new Place(formCardData(element))));





function formCardData(arr) {
  return {
    icon: arr[0],
    name: arr[1],
    description: arr[2],
    visited: arr[3],
  }
}