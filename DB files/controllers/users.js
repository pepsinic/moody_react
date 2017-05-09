const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const userM = mongoose.model("userCollection")
const tokenM = mongoose.model("tokenCollection")

router.post("/sign_up", (req, res) => {
	// axios : createUserAsync => username, email, password
    const userData = req.body
    console.log('userData SIGN_IN:')
    console.log(userData) 

    userM.create(userData, (error, UserRecord) =>{
        if (error) {
            console.log("error: ", error)
            if(error.code === 11000){
                console.log("error msg:", error.message)
                error = "Username or Email already exists"
                return res.status(400).json({error}) 
            }
            error = "Request failed"
            return res.status(400).json({error}) 
        }
        console.log("UserRecord CREATED:")
        console.log(UserRecord) 

        //create TOKEN - IT ALWAYS DOES even if user not created!!!!
        const token = jwt.sign({_id: UserRecord._id}, 'HELLO' )
        res.json({token, UserRecord})
    })
})

router.post("/log_in", (req, res) => {
    // axios : checkUserAsync => username, password
    const userData = {username: req.body.username, password: req.body.password}
    console.log('userData LOG_IN:')
    console.log(userData) 

    userM.findOne(userData, (error, UserRecord) => {
        console.log("gotBack:", error, UserRecord)

        if (!UserRecord || error) {
            console.log("error: ", error)
            error = "Email/Password combination not found"
            return res.status(400).json({error}) 
            //the status (400) is so that it goes in the action .catch
        }
        console.log("UserRecord FOUND:")
        console.log(UserRecord)

        //create TOKEN - IT ALWAYS DOES even if user not found!!!!
        const token = jwt.sign({_id: UserRecord._id}, 'HELLO' )
        res.json({token, UserRecord})
        // UserRecord is an object
        //no need of return here because it reach the end of the function so it will automatically send a it
    })
})

// Post log_out get the TOKEN ID find the user ID record of that token and delete that one then redirect to log_in

router.post("/log_out", (req, res) => { 
	
	// the args are taken from the precedent handler funtion ( it a cascading objection modification)
	
	console.log("logging out")
	if (req.cookies.sessionID){
		sessionID = {_id: req.cookies.sessionID}
		sessionM.findOneAndRemove(sessionID, (error, SessionRecord) => {
			console.log("sessionID deleted")
 			res.redirect("/logIn")
    	})
    	return 
    	// VERY IMPORTANT We need to "return" otherwise it will execute the second res.redirect and brake the code!!!!!
    }		
    res.redirect("/logIn")
	
})

module.exports = router


