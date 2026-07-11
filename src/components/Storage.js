import {
    state
} from "../common.js";

const storageJobItems = localStorage.getItem("bookMarkJobItems");
if(storageJobItems){
    state.bookmarkJobItems = JSON.parse(storageJobItems);
}