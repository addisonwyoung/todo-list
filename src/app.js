import { Item } from "./item.js"
import { add, parseHTML } from "./storage.js"
import {configDelete, configPriority, configCircle} from "./homepage-ui.js"
import "./homepage.css";
import "./dialog.css"





const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add-item");
const closeButton = document.querySelector("#add-item-button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
// the main magic happens here
configPriority();

closeButton.addEventListener("click", () => {


  let category = document.querySelector('.display-title').textContent;
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
  if(title === "" || description === "" || dueDate === "" || priority === "")
  {
    return;
  }
    dialog.close();

  add(title, description, dueDate, priority, category);
  let html = parseHTML(category);

  document.querySelector(".list-element-container").innerHTML = html;
  configDelete(category);
  configCircle();
  document.querySelector('#name').value = "";
   document.querySelector('#description').value = "";
   document.querySelector('#date').value = "";

      low.classList.remove("selected");
      med.classList.remove("selected");
      high.classList.remove("selected");
});

