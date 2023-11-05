let fs = require("fs").promises;

class CartManager {
  
  constructor(filePath) {
    this.path = filePath;
  }

  async getCarts() {
    try {
      let data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        // File doesn't exist
        return [];
      }
      throw new Error("Error loading the Cart's file");
    }
  }

  async addCart(products){
    try{
      let carts = await this.getCarts();
      let id = 1;
      if (carts.length > 0) {
        id = carts[carts.length - 1].id + 1;
      }
      let newCart = {
        id,
        products
      }
      carts.push(newCart)
      await fs.writeFile(this.path, JSON.stringify(carts));
      return true
    } catch (error){
      console.log("Error creating the cart");
      throw new Error("Error creating the cart");
    }
  }
}

module.exports = CartManager;