var express = require("express")
var app = express()  // => app is the whole app access and router is the next separation 

// Set view engine folder
app.set('view engine', 'ejs')
app.set('view cache', false);

// Body parser for forms
var bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Access cookies as objects
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Allows to send data to servers in other Domains
var cors = require('cors')
app.use(cors())

// public assets
app.use('/public', express.static('public'))


// FIRST THE USERSController because we must create the user or check if exists and then create TOKEN!!!!!

var usersController = require("../controllers/users") 
app.use("/users", usersController) 

// initialize Controllers
var tokenController = require("../controllers/token")
app.use("/", tokenController)

var emotionsController = require("../controllers/emotions") 
app.use("/emotions", emotionsController)

var commentsController = require("../controllers/comments")
app.use("/comments", commentsController)

const port = process.env.PORT || '3001'
app.listen(port, function(){
    console.log("listening in port " + port)
})