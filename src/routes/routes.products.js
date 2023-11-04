// Imports

const Router = require ('express');
const ProductManager = require("../controllers/ProductManager");

//Definitions

let productManager = new ProductManager("./data/products.json");
const router = Router();

//Methods

router.get("/", async (req, res) => { //Devuelve la lista completa de productos
  res.setHeader("Content-Type", "application/json"); //Seteamos el header
  let products = await productManager.getProducts();
  let limit = parseInt(req.query.limit); //Obtenemos el query del limite de productos
  if (!limit) {
    res.status(200).json({ products });
  } else {
    products = products.slice(0, limit); //Modificamos el array para limitar los resultados
    res.status(200).json({ products });
  }
  console.log(products);
});

router.get("/:id", async (req, res) => { //Devuelve un producto por su ID
  res.setHeader("Content-Type", "application/json"); //Seteamos el header
  let id = req.params.id; //Este param viene en formato string
  id = parseInt(id); //Transformamos el ID de string a numero
  if (isNaN(id)) {
    return res.status(400).json({error: "The ID you entered is not a valid number"});
  }
  result = await productManager.getProductById(id);
  console.log(result);
  if (!result) {
    res.status(400).json({error: "The product couldn't be found"});
  } else {
    res.status(200).json({ result });
  }
});

router.delete("/:id", async (req, res) => { //Elimina un producto por su ID
  res.setHeader("Content-Type", "application/json"); //Seteamos el header
  let id = req.params.id; //Este param viene en formato string
  id = parseInt(id); //Transformamos el ID de string a numero
  if (isNaN(id)) {
    return res.status(404).json({error: "The ID you entered is not a valid number"});
  }
  result = await productManager.removeProduct(id);
  console.log(result);
  if (!result) {
    res.status(400).json({error: "The product couldn't be found"});
  } else {
    res.status(200).json({status:'success', message:'Product removed successfully'})
  }
});

router.put("/:id", async (req, res) => { //Actualiza un producto por su ID
  res.setHeader("Content-Type", "application/json"); //Seteamos el header
  let product = req.body //Obtenemos la información que será actualizada
  let id = req.params.id; //Este param viene en formato string
  id = parseInt(id); //Transformamos el ID de string a numero
  if (isNaN(id)) {
    return res.status(400).json({error: "The ID you entered is not a valid number"});
  }
  result = await productManager.updateProduct(id, product);
  console.log(result);
  if (!result) {
    res.status(404).json({error: "The product couldn't be found"});
  } else {
    res.status(200).json({status:'success', message:'Product updated successfully'})
  }
});

router.post('/', async (req, res)=> {
  let product = req.body;
  console.log(product);
  if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
    return res.status(400).json({status: 'error', error: 'Incomplete data, make sure to enter all required fields'})
  } 
  try {
    await productManager.addProduct(product) //Enviamos el producto y lo desestructuramos en la funcion destino
    res.status(200).json({status:'success', message:'Product added successfully'})
  } catch (error) {
    res.status(400).json({status:'error', message: error.message});
  }
})

module.exports = router;