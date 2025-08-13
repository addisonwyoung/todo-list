export class Item {
  constructor(name, description, dueDate, priority)
  {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    
   
  }
}

function addNewItem(name, description, status)
{
  return new Item(name, description, status);
}

