import { Item } from './item.js'
import { state } from "./app.js"
export let lists = 
{
  "School": 
  {
    list: [],
    id: crypto.randomUUID()
  },
  "Personal":
  {
    list: [],
    id: crypto.randomUUID()
  }
}

export function setList(list)
{
  lists = list;
}

export function add(title, description, dueDate, priority, category)
{
  let id = crypto.randomUUID();
  let item = new Item(title, description, dueDate, priority, category, id);
  lists[category].list.push(item);
  localStorage.setItem('local', JSON.stringify(lists));

}

