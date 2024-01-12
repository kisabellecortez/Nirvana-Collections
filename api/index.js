var Express = require("express"); 
var Mongoclient = require('mongodb').MongoClient; 
var cors = require('cors'); 
const multer = require("multer")

var app = Express();
app.use(cors()); 

var CONNECTION_STRING = "mongodb+srv://kisabelle:20Kristina04@cluster0.x9kfe73.mongodb.net/nirvana-collections?retryWrites=true&w=majority"; 

var DATABASENAME = "nirvana-collections"; 
var database; 

app.listen(5000, ()=>{
    Mongoclient.connect(CONNECTION_STRING,(error, client)=>{
        database = client.db(DATABASENAME); 
        console.log("Mongo DB Connection Successful"); 
    })
})

app.get('/api/nirvana-collections/GetProducts', (request, response)=>{
    database.collection("products").find({}).toArray((error, result)=>{
        response.send(result);
    });
})
