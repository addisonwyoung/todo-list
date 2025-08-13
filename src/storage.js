import trashIcon from './trash-can.png';
export let lists = [
  {
    title: "Groceries",
    list: [],
    id: [],
    done: []
  }
]


export function add(title, description, dueDate, priority, category)
{
  
  for(let i = 0; i < lists.length; i++)
  {
    if(lists[i].title === category)
    {
      let id = crypto.randomUUID();
      let html = ` <div class="list-element">
            
                    <div class="left">
                    <div class="top-portion">
                    <span class="circle "></span>
               <input id="item-title" type="textarea" placeholder="Title" value=
               "${title}">
               </div>
           
               <input id="item-description" type="textarea" placeholder="Notes" value=
               "${description}">
            </div>
          

               <div class="right">
                  <div class="status ${priority}">${priority}</div>
                  <div class="item-date">${dueDate}</div>
                 <img class = "delete-button" id="trash" src="${trashIcon}" data-id = ${id} >
               </div>
          </div>`
      lists[i].list.push(html);
      lists[i].id.push(id);
      lists[i].done.push(false);
      return;
    }
  }
}

export function parseHTML(category)
{
  let html = "";
  for(let i = 0; i < lists.length; i++)
  {
    if(lists[i].title === category)
    {
      for(let j = 0; j < lists[i].list.length; j++)
      {
        html += lists[i].list[j];
      }
    }
  }
  return html;
}