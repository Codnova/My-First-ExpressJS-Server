// Imports
const express = require('express');
const routerProducts = require('./routes/routes.products')
const routerCarts = require('./routes/routes.carts')

//Definitions
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=> console.log('Escuchando en puerto: ', PORT));

//Methods

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => { //Homepage
  res.setHeader("Content-Type", "text/plain"); //Seteamos el header
  res.status(200).send('OK');
  
});

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
