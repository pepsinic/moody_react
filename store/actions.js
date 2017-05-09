import axios from "axios"


//these are functions that return each an object (id, username are 'name' or representations/arguments !!!!!)

const user = (username, email, password, error) => ({type: "USER", username, email, password, error})

const userCheck = (username, error) => ({type: "USER_CHECK", username, error})

const userError = (error) => ({type: "ERROR", error})

const addEmotion = (data) => ({type: "ADD EMOTION", data})

const addComment = (id, comments) => ({type: "ADD COMMENT", id, comments})

const deleteEmo = (id) => ({type: "DELETE EMOTION", id})

const tempUser = (username, password) => ({type: "TEMP USER", username, password})


//these are Thunks => functions that return funtions 
// .then is a "query" and it comes always with a 'promise'
//the server of localhost of the backend must be on!!!! BOTH!!!!

// create and adress so it is only here and changable easely
let apiDomain
if (window.location.hostname === "localhost") {
	apiDomain = "http://localhost:3001"
} else {
	apiDomain = "https://moodyreact-db.herokuapp.com/"
}


//functions for axios.get/.post that check if loggedIn or notLoggedIn and checking if token exists
axios.oldGet = axios.get
axios.get = (url, params = {}) => {
	const token = localStorage.getItem("token")
	
	if (token) params.token = token
	const axiosPromise = axios.oldGet(apiDomain + url, {params})
	
	axiosPromise.then((res) => {
		if (res.data.token) localStorage.setItem("token", res.data.token)
		if (res.data.notLoggedIn) localStorage.removeItem("token")
	})
	return axiosPromise
}

axios.oldPost = axios.post
axios.post = (url, body = {}) => {
	const token = localStorage.getItem("token")
	
	if (token) body.token = token
	
	const axiosPromise = axios.oldPost(apiDomain + url, body)
	
	axiosPromise.then((res) => {
		if (res.data.token) localStorage.setItem("token", res.data.token)
		if (res.data.notLoggedIn) localStorage.removeItem("token")
	})
	return axiosPromise
}


const checkUserAsync = (username, password) => {
	return (dispatch) => {
		axios.post("/users/log_in", {username, password})
			.then(function(response){
				console.log("checked USER data:")
				console.log(response.data.UserRecord)
				const userData = response.data.UserRecord
				const username = userData.username
				const error = "no error"
				fetchEmotionsAsync(() => {
					dispatch(userCheck(username, error))
				})
				//before i dispatch my user info to store i call my emotion from that user 
				//with "fetchEmotionsAsync()" + callback as it need to execute the dispatch afterwards
			})
		.catch(function(error){
				var error = error.response.data.error
				console.log("fetch check error USER: ", error)
				dispatch(userError(error))
			})
	}
}

const createUserAsync = (username, email, password) => {
	return (dispatch) => {
		axios.post("/users/sign_up", {username, email, password})
			.then(function(response){
				console.log("created USER data:")
				console.log(username, email, password)
				const error = "no error"
				dispatch(user(username, email, password, error))
			})
		.catch(function(error){
				var error = error.response.data.error
				console.log("fetch create error USER: ", error)
				dispatch(userError(error))
			})
	}
}


///this gets all the emotions at the begining 

const fetchEmotionsAsync = (callback = () => {}) => {
	return (dispatch) => {
		axios.get("/emotions")
			.then((res) => {
				dispatch(addEmotion(res.data))
				callback()
			})
			.catch(function(error){
				console.log("fetch error EMOTION: ", error)
			})
	} 
}

const addMultipleEmo = (emoList) => {
	return (dispatch) => {
		for (let emo of emoList) {
			dispatch(addEmotion(emo))
		}
	}
}

const createEmotionsAsync = (data, callback) => {
	return (dispatch) => {
		axios.post("/emotions/create", data)
			.then(function(response){
				dispatch(addEmotion(response.data))
				if (callback) callback()
			})
			.catch(function(error){
				console.log("create error: ", error)
			})
	}
}

const createCommentsAsync = (id, comments, callback) => {
	//  data = /comments/:id
	return (dispatch) => {
		axios.post("/comments/" + id, {comments})
			.then(function(response){
				console.log ('getting comments')
				console.log(response.data)
				const userData = response.data
				const id = userData._id
				const comments = userData.comments
				dispatch(addComment(id, comments))
				if (callback) callback()
			})
			.catch(function(error){
				console.log("comments error: ", error)
			})
	}
}

//DELETE : id is not in {} because otherwise its sends like this {id: {id: "58f61098717e8205ff2a3159"}} !NO!

const deleteEmotionsAsync = (id) => {
	return (dispatch) => {
		axios.post("/emotions/delete", id)
		.then(function(response){
			console.log ('deleting emo')
			dispatch(deleteEmo(response.data))
		})
		.catch(function(error){
			console.log("delete error: ", error)
		})
	}
}

export {
	user, userError, addEmotion, addComment, tempUser, userCheck,
	addMultipleEmo, 
	fetchEmotionsAsync,
	checkUserAsync,
	createUserAsync, 
	createEmotionsAsync, 
	createCommentsAsync, 
	deleteEmotionsAsync}

// Example of Thunk that dispaches many emotions to the store using an array "emoList" => [pedroEmotion0,pedroEmotion1, pedroEmotion2] 
// this is how you write a THUNK :
// const addMultipleEmo = (emoList) => {
// 	return (dispatch) => {
// 	 	"=> always return a function here ()  - You can choose dispatch, axios(AJAX), console.log/alerts/texts for messages, etc..." 
// 		}
// 	}
// }
