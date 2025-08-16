import {parseHTML, parseNavHTML} from "./dom.js"
import { add, setList } from "./storage.js"
import {configPriority, configurateAll} from "./init_item.js"
import {configNav, configAdding, configDelete, configAllNav} from "./nav.js"
import {lists} from "./storage.js"
import { todayAsInputValue } from "./date.js"
import "./homepage.css";
import "./dialog.css"
import "./nav.css"
import "./item.css"
import { isToday } from "date-fns";

console.log("hi");
console.log('BOOT @', new Date().toISOString());

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add-item");
const closeButton = document.querySelector("#add-item-button");

const parsedLists = JSON.parse(localStorage.getItem('local'));
let saved = false;

if(parsedLists === null)
{
 
}
else
{
  setList(parsedLists);
  saved = true;
}

export let state = { category: Object.keys(lists)[0] }

Object.assign(globalThis, { lists, parsedLists, state });

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {


  let title = document.querySelector('#name').value;
  let description = document.querySelector('#description').value;
  let dueDate = document.querySelector('#date').value;
       let low = document.querySelector('.lowprio');
      let med = document.querySelector('.med');
      let high = document.querySelector('.high');
  let priority = "";
  if(low.classList.contains('selected'))
  {
    priority = "Low";
  }
  else if(med.classList.contains('selected'))
  {
    priority = "Medium";
  } 
  else if(high.classList.contains('selected'))
  {
    priority = "High";
  }
  if(title === "" || priority === "")
  {
    return;
  }
    dialog.close();

  add(title, description, dueDate, priority, state.category);
  parseHTML();
  configurateAll();

  document.querySelector('#name').value = "";
   document.querySelector('#description').value = "";
   document.querySelector('#date').value = "";

      low.classList.remove("selected");
      med.classList.remove("selected");
      high.classList.remove("selected");
});

initialPageLoad();







function initialPageLoad()
{
  document.querySelector('.display-title').textContent = state.category;
    parseHTML();
  configPriority();
  document.querySelector('.projects').innerHTML = parseNavHTML();
  configAllNav();
  configurateAll();
}