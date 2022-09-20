const express = require("express");
const mongoose = require("mongoose")
const bodyparser = require('body-parser')
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const connection = mongoose.connection;
require('./db/conn')

const static_path = path.join(__dirname, './public')
app.use(express.static(static_path))
app.set("view engine", "pug")
app.use(express.urlencoded({ extended: true }))
const RegisterSchema = new mongoose.Schema({
  name: String,
  email: String, 
  password: String
});
const RegisterUser = mongoose.model('RegisterUser', RegisterSchema);

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/login', (req, res) => {
  res.render('../public/login')
})
app.post('/reg',  (req, res) => {
  // console.log(req.body)
    const usermail = req.body.email
    const RegisterClient = new RegisterUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    RegisterClient.save().then(()=>{
      res.render('index')

    }).catch((err)=>{
      res.send(err)
    })     
  
    
  // res.send("Working")
})
app.post('/log', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    let usermail =  await RegisterUser.findOne({email:email})
    if (usermail.password === password) {
      res.render('index')
    } else {
      res.send("Invalid Credinitals Entered")
    }
  
})
app.get('/admin', (req, res) => {
  RegisterUser.find({}, function(err, docs){
    if(err){
      res.json(err);
    } 
      
    else {
      console.log(docs[0].name)
      res.render('../public/admin.pug', {posts: docs, participants: docs.length});
    }  
      
})})
app.get('*', (req, res) => {
  res.render('../public/404.pug')
  // res.send("404")
})


app.listen(port, () => {
  console.log(`Congrats the app is listening on port ${port}`)
})
