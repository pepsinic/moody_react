const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

// "M" at the end for mongoose abreviation
const userM = mongoose.model("userCollection")
const tokenM = mongoose.model("tokenCollection")

//WHAT IS A QUERY?
//A query is in the url after "?"" for example => http://localhost:8080/sign_in?name=pedro&address=pedroroad
//it will be auto-created by axios and then parse by Node/express into "req.query"

router.use("/*", function (req, res, next) {
  var token = req.query.token || req.body.token
  console.log("creating a token")
  console.log(req.query, req.body)
  if(token){
    try {
        const decoded = jwt.verify(token, 'HELLO') 
        //decoded = the information we gave with the key 'hello'
        req.currentUser = decoded._doc
        return next()
    } catch(error) { console.log(error) }     
  }
  res.json({notLoggedIn: true})
})

module.exports = router 


