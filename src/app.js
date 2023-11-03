const express = require('express');

const app = express();

const PORT = 3000;

const server = app.listen(PORT, ()=> console.log('Escuchando en puerto: ', PORT));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let users = [];

app.post('/api/users', (req, res)=> {
  let user = req.body;
  if (!user.name || !user.lastname) {
    return res.status(400).send({status: 'error', error: 'Incomplete data, make sure to enter both first and last name'})
  } 
  users.push(user)
  res.status(200).send({status:'success', message:'User created successfully'})


})

app.get('/api/users', (req,res)=> {
  res.status(200).send({users})
})


