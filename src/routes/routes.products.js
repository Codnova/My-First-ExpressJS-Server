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
    res.status(200).send({ products });
  } else {
    products = products.slice(0, limit); //Modificamos el array para limitar los resultados
    res.status(200).send({ products });
  }
  console.log(products);
});

router.get("/:id", async (req, res) => { //Devuelve un producto por su ID
  res.setHeader("Content-Type", "application/json"); //Seteamos el header
  let id = req.params.id; //Este param viene en formato string
  id = parseInt(id); //Transformamos el ID de string a numero
  if (isNaN(id)) {
    return res.status(404).send("el ID ingresado no es un numero");
  }
  result = await productManager.getProductById(id);
  console.log(result);
  if (!result) {
    res.status(404).send("No se encontró el producto");
  } else {
    res.status(200).json({ result });
  }
});

router.post('/', async (req, res)=> {
  let product = req.body;
  console.log(product);
  if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
    return res.status(400).send({status: 'error', error: 'Incomplete data, make sure to enter all required fields'})
  } 
  try {
    await productManager.addProduct(product) //Enviamos el producto y lo desestructuramos en la funcion destino
    res.status(200).send({status:'success', message:'Product added successfully'})
  } catch (error) {
    res.status(400).send({status:'error', message: error.message});
  }
})

module.exports = router;