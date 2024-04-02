const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productModel = require("./models/products")

const app = express(); 
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://kisabelle:20Kristina04@cluster0.x9kfe73.mongodb.net/nirvana-collections?retryWrites=true&w=majority&appName=Cluster0")

app.get("/getProducts", (req, res) =>{
    productModel.find()
    .then(products => res.json(products))
    .catch(err => res.json(err))
})

app.listen(3001, ()=>{
    console.log("server is running")
})