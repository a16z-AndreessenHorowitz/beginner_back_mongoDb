const express = require('express')
const app = express()

// Gắn moment vào locals để Pug dùng được
const moment=require("moment")
app.locals.moment = moment
//body parser
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
// body parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser()); 

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

//Socket
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const server = createServer(app);

const io = new Server(server);

global._io=io


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

server.listen(port,"0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`)
})

