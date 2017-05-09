// connect to DB
const mongoose = require('mongoose');

// mongoose.connect("mongodb://" +
// 	process.env.mongoLab_username + ":" +
// 	process.env.mongoLab_password +
// 	"@ds113680.mlab.com:13680/moody")


mongoose.connect(process.env.mongolab_url || "mongodb://localhost:27017/db")

// The official adress : https://moody.herokuapp.com/


// require models
require("../models/user.js")
require("../models/token.js")
require("../models/emotion.js")


// THIS GENERATES A LOT OF DATE + EMOTIONS FOR USERID X

// var yourRandomGenerator=function(rangeOfDays,startHour,hourRange){
//     var today = new Date(Date.now());
//     return new Date(today.getYear()+1900, today.getMonth() - 3, today.getDate()+Math.random() *rangeOfDays, Math.random()*hourRange + startHour, Math.random()*60)
// }
// for(let i = 0; i<40; i++){
// 	mongoose.model("emotionCollection").create({
// 		userID: "58b9790e6ad93958fe22dd77",
// 		emotion: (Math.floor(Math.random()*3) + 1),
// 		time: yourRandomGenerator(80, 1, 24)
// 	})
// }
