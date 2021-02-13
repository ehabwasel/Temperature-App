const express = require('express')
const app = express()
const exphbs  = require('express-handlebars'); 
const axios = require('axios');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json()); 
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'));
const API_KEY = require('./sources/keys.json').API_KEY;



app.get('/', (req, res) =>{
  res.render('index');
});

app.post('/',(req, res) =>{
  const cityName =req.body.cityName;
  // if(!cityName ){
  //   return res.status(400).end(`Please write valid cityName`);
  // }
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
  .then((response)=>{
    const data = response.data.main;
    const temp = Math.floor(data.temp);
    const feels_like = Math.floor(data.feels_like);
    const humidity = data.humidity;
    const description = response.data.weather[0].description
     res.render("index",{
      temp ,feels_like,humidity,cityName,description
     })
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.render('index',{message:" oops!!!..Please write valid city Name ",error})
  })
  
  
});
 
const PORT =process.env.PORT || 8080;
app.listen(PORT,()=>console.log("server is running on port ",PORT))
