const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;

//define paths for express configs
const publicPathDir = path.join(__dirname,'../public')
const viewsPathDir = path.join(__dirname,'../templates/views')
const partialsPathDir = path.join(__dirname,'../templates/partials')

//set up handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPathDir)
hbs.registerPartials(partialsPathDir)

//setup static directory to serve
app.use(express.static(publicPathDir))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Akshay"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Akshay"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Akshay",
        message:"This is a FAQ page"
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error:"You must provide a address"
        })
    }
    geocode(address, (error,{latitude, longitude, location} = {})=> {
        if (error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error })
            }
            return res.send({
                location: location,
                forecast : forecastdata,
                address : address
            })
          })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:"Help article not found",
        name:"Akshay"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        error:"Page not found!",
        name:"Akshay"
    })
})

app.listen(port, ()=>{
    console.log('Server running on port ' + port);
})
