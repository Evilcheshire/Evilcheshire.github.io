class MenuItem {
    constructor(alt, description, image, price) {
      this.alt = alt;          
      this.description = description;
      this.image = image;         
      this.price = price;         
    }
  }
  
  class Menu {
    constructor(title, order, items) {
      this.title = title; 
      this.order = order; 
      this.items = items; 
    }
  }
  
module.exports = { Menu, MenuItem };