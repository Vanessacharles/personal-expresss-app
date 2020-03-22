const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:first@cluster0-ohlzf.mongodb.net/test?retryWrites=true";
const dbName = "demo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('artist').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {artist: result})
  })
})

app.post('/artist', (req, res) => {
  db.collection('artist').save({name: req.body.name, heart: 0,}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/artist', (req, res) => {
  db.collection('artist')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      heart:req.body.heart + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/artist', (req, res) => {
  db.collection('artist').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Artist deleted!')
  })
})
