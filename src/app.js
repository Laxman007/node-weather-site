const express=require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')

const app=express()

const port=process.env.PORT || 3000

// ? Define paths for express config 
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// ? Setup handlebars and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// ? Setup static directory to server
app.use(express.static(publicDirectory))

 
// ? Define root directory
app.get('',(req,res)=>{
    res.render('index',{
        name:'Weather',
    })
})

// ? Define /about page
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'About'
    })
})

// ? Define /help page
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Help',
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide address query"
        })
    }
    const address=req.query.address
    forecast(address,(error,response)=>{
        if(error){
            return res.send({
                error:error
            })
        }
        
            res.send(response)
    })
})

// ? Handling unknown url
app.get('*',(req,res)=>{
    res.render('404',{
        error:'page not found'
    })
})

// ? Start the server to listen the requests
app.listen(port,()=>{
    console.log('Server started at '+port)
})