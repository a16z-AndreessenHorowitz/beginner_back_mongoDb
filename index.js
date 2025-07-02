const express = require('express')
const app = express()
//method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
//flash
var flash = require('express-flash')
const session = require('express-session');

app.use(session({
  secret: 'MHUY231',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

//locals
const systemConfig=require("./config/system")
app.locals.prefixAdmin=systemConfig.prefixAdmin
//env
require('dotenv').config()

//database
const database=require('./config/database')

//Template 
app.set('views', './views')
app.set('view engine', 'pug')



//Route
const routeClient=require('./routes/client/index.route')
const routeAdmin=require("./routes/admin/index.route")

//port
const port = process.env.PORT

//public 
app.use(express.static('public'))
//Route
routeClient(app)
routeAdmin(app)

database.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})