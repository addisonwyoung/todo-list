export class Item {
  constructor(title, description, dueDate, priority, category, id)
  {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
    this.id = id;
  }
}

function addNewItem(name, description, status)
{
  return new Item(name, description, status);
}

