// Imports

const Router = require ('express');
const CartManager = require("../controllers/CartManager");

// Definitions

let cartManager = new CartManager("./data/carts.json");
const router = Router();

// Methods

router.get("/", async (req, res) => { // Get the complete list of carts
  res.setHeader("Content-Type", "application/json"); // Set the header
  let carts = await cartManager.getCarts();
  res.status(200).json({ carts });
});


router.post("/", async (req,res) => { // Creates a new cart with products
  let products = req.body;
  if (!products) {
    return res.status(400).json({status: 'error', error: 'Incomplete data, make sure specify the products to be added to the cart'})
  } else {
    if (await cartManager.addCart(products)) {
      res.status(200).json({status:'success', message:'Cart created successfully'})
    }
    
  }

})



module.exports = router;
