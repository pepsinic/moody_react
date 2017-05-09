const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")


const userM = mongoose.model("userCollection")
const tokenM = mongoose.model("tokenCollection")
const emotionM = mongoose.model("emotionCollection")


//send all the Emotion Collection => fetchEmotionsAsync 
router.get('/', function(req, res) {
	emotionM.find({}, function(err, records) {
			res.json(records)		
	})
})

//action or thunk => createEmotionsAsync

router.post('/create', function(req, res) {
	console.log(req.body)
	emotionM.create(req.body, function(error, records) {
		if (error){
			console.log(error)
		}
		res.json(records)		
	})
})

//delete emotion in "list"

router.post('/delete', function(req, res) {
	console.log(req.body.id)

	emotionM.findOneAndRemove({_id: req.body.id}, function(error, records) {
		console.log("this records is deleted :")
		console.log(records)
		
		if (error){
			console.log(error)
		}
		res.json(records._id)		
	})
})


module.exports = router

