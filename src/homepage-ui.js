import { lists, parseHTML } from "./storage.js";

export function configDelete(category)
{
  document.querySelectorAll(".delete-button").forEach( (btn) => {
    btn.addEventListener('click', () => {
                    console.log(lists);
          for(let i = 0; i < lists.length; i++)
    {
      if(lists[i].title === category)
      {
        // correct list find item
        for(let j = 0; j < lists[i].id.length; j++)
        {
          if(lists[i].id[j] === btn.dataset.id)
          {
            // remove jth item
            lists[i].id.splice(j, 1);
            lists[i].list.splice(j, 1);
            lists[i].done.splice(j, 1);
            let html = parseHTML(category);
            
              document.querySelector(".list-element-container").innerHTML = html;

              configDelete(category);
              console.log(lists);
              return;

          }
        }
      }
    }
       
    })


  })

}

export function configPriority()
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

export function configCircle(category)
{
  let circle = document.querySelectorAll('.circle');
  circle.forEach( (c) => {

    c.addEventListener('click', () => {
      
      c.classList.add('circle-clicked')
    })
  })
}

export function configurateAll(category)
{
  configDelete(category);
  configPriority();
  
}

