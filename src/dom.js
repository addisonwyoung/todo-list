import { state } from "./app.js"
import { lists } from "./storage.js"
import trashIcon from './trash-can.png';

export function singleItem(status, id, title, description, priority, dueDate)
{
  return ` <div class="list-element">
            
                    <div class="left">
                    <div class="top-portion">
                    <span class="circle ${status}" data-id = ${id}></span>
               <input class="item-title" data-id = ${id} id="item-title" type="textarea" placeholder="Title" value=
               "${title}">
               </div>
           
               <input data-id = ${id} id="item-description" type="textarea" placeholder="Notes" value=
               "${description}">
            </div>
          

               <div class="right">
                  <div class="status ${priority}" data-id = ${id}>${priority}</div>
                  <input type="date" value="${dueDate}" class="item-date" data-id = ${id}>
          
                 <img class = "delete-button" id="trash" src="${trashIcon}" data-id = ${id} >
               </div>
          </div>`
}
export function parseHTML()
{
  let html = "";
  if(lists[state.category] === undefined)
  {
    return;
  }
  for(let i = 0; i < lists[state.category].list.length; i++)
  {
    let list = lists[state.category].list[i];
    let title = list.title;
    let description = list.description;
    let priority = list.priority;
    let dueDate = list.dueDate;
    let id = list.id;
    let status = list.done;
    html += ` <div class="list-element">
            
                    <div class="left">
                    <div class="top-portion">
                    <span class="circle ${status}" data-id = ${id}></span>
               <input class="item-title" data-id = ${id} id="item-title" type="textarea" placeholder="Title" value=
               "${title}">
               </div>
           
               <input data-id = ${id} id="item-description" type="textarea" placeholder="Notes" value=
               "${description}">
            </div>
          

               <div class="right">
                  <div class="status ${priority}" data-id = ${id}>${priority}</div>
                  <input type="date" value="${dueDate}" class="item-date" data-id = ${id}>
          
                 <img class = "delete-button" id="trash" src="${trashIcon}" data-id = ${id} >
               </div>
          </div>`
  }
    
  
document.querySelector(".list-element-container").innerHTML = html;

}

export function rawHTML()
{
  let html = "";
  if(lists[state.category] === undefined)
  {
    return;
  }
  for(let i = 0; i < lists[state.category].list.length; i++)
  {
    let list = lists[state.category].list[i];
    let title = list.title;
    let description = list.description;
    let priority = list.priority;
    let dueDate = list.dueDate;
    let id = list.id;
    let status = list.done;
    html += ` <div class="list-element">
            
                    <div class="left">
                    <div class="top-portion">
                    <span class="circle ${status}" data-id = ${id}></span>
               <input class="item-title" data-id = ${id} id="item-title" type="textarea" placeholder="Title" value=
               "${title}">
               </div>
           
               <input data-id = ${id} id="item-description" type="textarea" placeholder="Notes" value=
               "${description}">
            </div>
          

               <div class="right">
                  <div class="status ${priority}" data-id = ${id}>${priority}</div>
                  <input type="date" value="${dueDate}" class="item-date" data-id = ${id}>
          
                 <img class = "delete-button" id="trash" src="${trashIcon}" data-id = ${id} >
               </div>
          </div>`
  }
    
  
return html;

}

export function parseNavHTML()
{
  let html = "";
  for(const key in lists)
  {
    if(state.category === key)
    {
       html += ` <div class="project-item ${key} project-selected">
                  <input type="text" class="left category-input" value="${key}" data-id = "${lists[key].id}">
               

                <div class="right hide">
                  <img class="" src="${trashIcon}" data-id = "${lists[key].id}" >
                </div>
              </div>`;
    }
    else
    {
       html += ` <div class="project-item ${key}">
                 <input type="text" class="left category-input" value="${key}" data-id = "${lists[key].id}">

                <div class="right hide">
                  <img src="${trashIcon}" data-id = "${lists[key].id}">
                </div>
              </div>`;
    }
   
  }
  return html
}