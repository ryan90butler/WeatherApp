const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const {getWeather}  = require('./services/weatherServices');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let searches = [];

app.post('/api/places',(req,res) => {
  getWeather(req.query.state,req.query.city)
    .then(weather => {
      searches.push(req.query.city);
      res.send({
        weather: weather,
        searches: searches
      });
    })
});

app.get('/api/places',(req,res)=> {
  res.send({
    searches: searches
  })
})

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
  console.log(`Listening on port ${port}`)
})