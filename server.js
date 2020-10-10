const express = require('express')
const crudApp = express();
const bodyParser = require('body-parser');
const { response } = require('express');
// Make sure you place body-parser before your CRUD handlers!
crudApp.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient
connectionString = 'mongodb+srv://ambika:ambika@1234@cluster0.nhi8d.mongodb.net/test_db?retryWrites=true&w=majority'
crudApp.set('view engine', 'ejs');
crudApp.use(express.static('public'));
crudApp.use(bodyParser.json());
//ESTABLISHING DB CONNECTION

//ESTABLISHING DB CONNECTION
crudApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

MongoClient.connect(connectionString, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  console.log("Connectd");
  var db = db.db("test_db");
  const quotesCollection = db.collection('india-cities')
  //CREATE OPERATION
  crudApp.post('/cities', (req, res) => {
    quotesCollection.insertOne(req.body) //insertOne is the method to add data to collection
     .then(result => {
       res.send(result);
     })
     .catch(error => console.error(error))
 });
 //READ OPERATION
 crudApp.get('/cities',(req,res)=>{
    const cursor = db.collection('india-cities').find().toArray()
    .then(results => {
     res.send(results);
    })
    .catch(error => console.error(error))
 });

});

  
crudApp.get('/', (req, res) => {
   res.sendFile(__dirname+'/index.html')
});


crudApp.listen(3000, function() {
  console.log('listening on 3000')
})
