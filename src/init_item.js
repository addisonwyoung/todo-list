import { lists } from "./storage.js";
import { parseHTML } from "./dom.js"
import { state } from "./app.js"


export function configurateAll()
{
  configDelete();
  configCircle();
  configToggle();
  configEditing();
}

function configDelete()
{
  document.querySelectorAll(".delete-button").forEach( (btn) => {
    btn.addEventListener('click', () => {
        let arr = lists[state.category].list;
        // correct list find item
        for(let j = 0; j < lists[state.category].list.length; j++)
        {
          if(lists[state.category].list[j].id === btn.dataset.id)
          {
            // delete the entire item at the thing in other words find it
            arr.splice(j,1);
          
            parseHTML();
        
              configurateAll()

              return;

          }
        }
      
    
       
    })


  })

}

export function configPriority() // do something about this
{
  document.querySelectorAll(".priority-button").forEach( (btn) => {
    btn.addEventListener('click', () => {
      // remove exsting seelcted
      let low = document.querySelector('.lowprio');
      let med = document.querySelector('.med');
      let high = document.querySelector('.high');
      low.classList.remove("selected");
      med.classList.remove("selected");
      high.classList.remove("selected");

      btn.classList.add("selected");
      return;
    })
  })
}

export function configCircle()
{
  let circle = document.querySelectorAll('.circle');
  circle.forEach( (c) => {

    c.addEventListener('click', () => {
      let stat;
      if(c.classList.contains('true'))
      {
        c.classList.remove('true');
        stat = false;
      }
      else 
      {
        c.classList.add('true');
        stat = true;
      }
    
      for(let i = 0; i < lists[state.category].list.length; i++)
      {
        if(lists[state.category].list[i].id === c.dataset.id)
        {
          lists[state.category].list[i].done = stat;
        }
      }
      console.log(lists);
    })
  })
}

function configToggle()
{
  document.querySelectorAll('.status').forEach( (btn) => {

    btn.addEventListener('click', () => {
      let item;
      for(let i = 0; i < lists[state.category].list.length; i++)
      {
        if(lists[state.category].list[i].id === btn.dataset.id)
        {
         item = lists[state.category].list[i];
        }
      }
      // click and add...
      if(btn.classList.contains('Medium')) {
        btn.classList.remove("Medium");
        btn.classList.add("High");
        btn.textContent = "High";
        item.priority = "High";
        console.log(lists);
      }
      else if(btn.classList.contains('High')) {
        btn.classList.remove("High");
        btn.classList.add("Low");
        btn.textContent = "Low";
        item.priority = "Low";
        console.log(lists);
      } else if(btn.classList.contains('Low')) {
        btn.classList.remove("Low");
        btn.classList.add("Medium");
        btn.textContent = "Medium";
        item.priority = "Medium";
        console.log(lists);
      }
    })
  })
}

function configEditing()
{
  document.querySelectorAll('.item-title').forEach( (item) => {
    item.addEventListener('input', () => {
      let text = item.value;
      for(let i = 0; i < lists[state.category].list.length; i++)
      {
        if(lists[state.category].list[i].id === item.dataset.id)
        {
          // found item change internal state
          lists[state.category].list[i].title = text;
            localStorage.setItem('local', JSON.stringify(lists));
          break;
        }
      }
    })
  })

  document.querySelectorAll('#item-description').forEach( (item) => {
    item.addEventListener('input', () => {
      let text = item.value;
      for(let i = 0; i < lists[state.category].list.length; i++)
      {
        if(lists[state.category].list[i].id === item.dataset.id)
        {
          // found item change internal state
          lists[state.category].list[i].description = text;
            localStorage.setItem('local', JSON.stringify(lists));
          break;
        }
      }
    })
  })

    document.querySelectorAll('.item-date').forEach( (item) => {
    item.addEventListener('input', () => {
      let text = item.value;
      for(let i = 0; i < lists[state.category].list.length; i++)
      {
        if(lists[state.category].list[i].id === item.dataset.id)
        {
          // found item change internal state
          lists[state.category].list[i].dueDate = text;
            localStorage.setItem('local', JSON.stringify(lists));
          break;
        }
      }
    })
  })
}

