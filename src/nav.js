import { state } from "./app.js"
import {lists} from "./storage.js"
import { parseHTML, parseNavHTML, rawHTML, singleItem } from "./dom.js"
import {configPriority, configurateAll} from "./init_item.js"
import { today } from "./date.js"
import { formatDistance, subDays } from "date-fns";

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
//=> "3 days ago"


export function configNav()
{
  
document.querySelectorAll('.project-item').forEach((item) => {
  item.addEventListener('click', () => {
   // document.querySelector('#add-item-button').classList.remove('hide');

    document.querySelectorAll('.project-item').forEach( (i) => {
      i.classList.remove('project-selected');
    })
    document.querySelectorAll('.filter-category').forEach( (i) => {
      i.classList.remove('project-selected');
    })

    item.classList.add('project-selected');

    let category = item.querySelector(".left").value; // here
    state.category = category;
    document.querySelector(".display-title").textContent = category;
    console.log(state.category);

     parseHTML();
     configurateAll();
  })
})



  document.querySelectorAll('.filter-category').forEach( (item) => {
 //   document.querySelector('#add-item-button').classList.add('hide');
    item.addEventListener('click', () => {

         document.querySelectorAll('.project-item').forEach( (i) => {
      i.classList.remove('project-selected');
    })

      document.querySelectorAll('.filter-category').forEach( (i) => {
      i.classList.remove('project-selected');
    })

    // remove the styles above
    // add project
     item.classList.add('project-selected');
     let text = item.textContent;
    document.querySelector('.display-title').textContent = text;
    //
    let keys = Object.keys(lists);
    if(text === "All")
    {
      let html = "";
      for(const key in lists)
      {
        state.category = key;
        html += rawHTML();
      }

      document.querySelector('.list-element-container').innerHTML = html;
    }
    else if(text === "Today")
    {
         let html = "";
      for(let i = 0; i < keys.length; i++)
      {
        let li = lists[keys[i]].list;
        for(let j = 0; j < li.length; j++)
        {
          if(li[j].dueDate === today() )
          {
            html += singleItem(li[j].status, li[j].id, li[j].title, li[j].description, li[j].priority, li[j].dueDate);
          }
        }
       
      }
      document.querySelector('.list-element-container').innerHTML = html;
    }
    else if(text === "Upcoming")
    {
      let html = "";
      for(let i = 0; i < keys.length; i++)
      {
        let li = lists[keys[i]].list;
        for(let j = 0; j < li.length; j++)
        {
          if(new Date(li[j].dueDate) > new Date(today()) )
          {
            html += singleItem(li[j].status, li[j].id, li[j].title, li[j].description, li[j].priority, li[j].dueDate);
          }
        }
       
      }
      document.querySelector('.list-element-container').innerHTML = html;
    }
     
    

    })
  })

}

export function configAdding()
{
  document.querySelector('#add-proj').addEventListener('click', () => {
  document.querySelector('#proj-form').classList.remove('hide');
})

document.querySelector('#cancel').addEventListener('click', () => {
   document.querySelector('#proj-form').classList.add('hide');
})

document.querySelector('#padd').addEventListener('click', () => {
   
  let name = document.querySelector('#proj-input').value;
  if(name === "") {
    return;
  }

  document.querySelector('#proj-input').value = ""; // REMOVE THE TITLE ON DELETE
  document.querySelector('#proj-form').classList.add('hide');
  lists[name] = {
    list: [],
    id: crypto.randomUUID()
  }
  document.querySelector(".projects").innerHTML = parseNavHTML();
  configDelete();
  console.log(lists);
  configNav();
    let item = document.querySelector(`.${name}`);
       document.querySelectorAll('.project-item').forEach( (i) => {
      i.classList.remove('project-selected');
    })
    item.classList.add('project-selected');
    let category = item.querySelector(".left").value; // here
    state.category = category;
    document.querySelector(".display-title").textContent = category;
    console.log(state.category);
     parseHTML();
     configurateAll();
       localStorage.setItem('local', JSON.stringify(lists));
})
}

export function configDelete()
{
  document.querySelectorAll('.project-item').forEach((item) => {
    item.addEventListener('mouseover', () => {
      item.classList.add('hover')
      item.querySelector('.right').classList.remove('hide');
    })

    item.addEventListener('mouseout', () => {
      item.classList.remove('hover')
      item.querySelector('.right').classList.add('hide');
    })
  })

  document.querySelectorAll('.project-item .right img').forEach( (item) => {
    item.addEventListener('click', (e) => {
     e.stopPropagation();
    const keys = Object.keys(lists);

for (let i = 0; i < keys.length; i++) {
  if(lists[keys[i]].id === item.dataset.id)
  {
    delete lists[keys[i]];
  
  }
}
  
    document.querySelector('.projects').innerHTML = parseNavHTML();
    configNav();
    configDelete();
    })

// remove title 
document.querySelector('.project-title').value = "";
  })
  localStorage.setItem('local', JSON.stringify(lists));
}



export function configAllNav()
{
  configNav();
  configAdding();
  configDelete();
  configNavEditing();
}

function configNavEditing()
{
  document.querySelectorAll('.category-input').forEach( (item) => {
    item.addEventListener('blur', () => {
    //   e.stopPropagation();
      let text = item.value;
      const keys = Object.keys(lists);

      for(let i = 0; i < keys.length; i++)
      {
        if(lists[keys[i]].id === item.dataset.id)
        {
          // found item change internal state
          lists[text] = {
            list: lists[keys[i]].list,
            id: lists[keys[i]].id
          }

          delete lists[keys[i]];
          document.querySelector('.projects').innerHTML = parseNavHTML();
          configAllNav();
          localStorage.setItem('local', JSON.stringify(lists));
    
          break;
        }
      }
    })
  })

 
}

