//only to use while we are in dev :
// const pedro = {username: "pedro", email: "pedro@pedro.pedro", password: "pedro"}


// state = {} an object because we will only have one user during the session
// use Obj.assign to add something to the obj{}
const user = (state = {username: "", email: "", password: "", error: ""}, action) => {
	switch (action.type){
		case "ERROR":
			return  Object.assign({}, state, {error : action.error})
		case "TEMP USER":
			return Object.assign({}, state, {username : action.username, password: action.password})
		case "USER":
			return Object.assign({}, state, {
				username: action.username, 
				email: action.email, 
				password: action.password, 
				error: action.error
				})
		case 'USER_CHECK':
			return Object.assign({}, state, {
				username: action.username, 
				error: action.error, 
				})
		default:
			return state
		}
}


const emotion = (state = [], action) => {
	switch (action.type){
		case "ADD EMOTION":
			return state.concat(action.data)
		case "ADD COMMENT":
			return state.map((emo) => {
				if (emo._id === action.id) {
					return Object.assign({}, emo, {comments: action.comments})
				}
				return emo
			})
		case "DELETE EMOTION":
			console.log('the emotion with id :', action.id)
			return state.filter((emotion, i) => action.id !== emotion._id)
		default:
			return state
	}
}



// TO ADD & FIND => we must map through all the obj "emotion" and give a condition so that it will create a new state.emotion
// with a comment in the right emotion.id !!!!!

export {user, emotion}

