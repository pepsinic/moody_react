const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const tokenM = mongoose.model("tokenCollection")
const emotionM = mongoose.model("emotionCollection")

//to pass the information of the THUNKS "createCommentsAsync"
// you can't see anything because it is a POST!!!!! no need to go to http://localhost:3001/comment/58f0a2ab83e95596f7adfda2
// But look at the CONSOLE !!!!! mood_react_DB

router.post("/:id", (req, res) => { 
	console.log("creating comments")
	console.log(req.body)
	emotionM.findByIdAndUpdate({_id: req.params.id}, {$set: {comments: req.body.comments}}, { new: true },function(error, records) { 
		if (error){	
			console.log(error)
		}
		console.log("records with comments :")
		console.log(records)
		res.json(records)		
	})
}) 




module.exports = router

