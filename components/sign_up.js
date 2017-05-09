import React from 'react'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import {createUserAsync, tempUser} from '../store/actions'
import {browserHistory} from "react-router"
import {Button} from 'react-bootstrap'

class SignUp extends React.Component {
	constructor(props){
		super(props)
		this.state = {username: props.user.username, email: props.user.email, password: props.user.password, error: props.user.error}
	}
	handleChange(e){
		console.log(e.target.value)
		this.setState({[e.target.name]: e.target.value})
		// [] are use so that any value we get are set again!!! very pratical
	}
	handleSubmit(e){
		e.preventDefault()
		var re = /^[\w ]+$/

        if(!re.test(this.state.username)) {
        	console.log("No special character in your username please")
        } else if (this.state.password.length < 6){
        	console.log("Password must be a least 6 character long, thank you")
    	} else {
        	const username = this.state.username.slice(0,1).charAt(0).toUpperCase() + this.state.username.slice(1)
        	const email = this.state.email
        	const password = this.state.password
 
        	this.props.createUserAsync(username, email, password)
        }

        //!!!!!! ONLY  during dev so that we don't need to create a user everytime!
        //this.props.user(username, email, password)   => user import, bindactioncreators...to pass the props to store!!!!!
        // localStorage.setItem('Token', 'Elium')  only during dev so that we don't need to create a user everytime!
        // browserHistory.push("/emotion")
	}

	handleClick(e){
		e.preventDefault()
		const username = this.state.username.slice(0,1).charAt(0).toUpperCase() + this.state.username.slice(1)
        const password = this.state.password
        this.props.tempUser(username, password)
		browserHistory.push('/log_in')
	}

	componentDidUpdate (){
		if (this.props.user.error == "no error"){
        	browserHistory.push('/emotion')
        }
	}

	render(){
		console.log(this.state)
		return (
			<div>
				<div className="nav">
					<ShowError error = {this.props.user.error}/>
					<form onSubmit = {this.handleSubmit.bind(this)}>
						<div className="sign_up">
						 	<input
							 	type="text"
							 	required
							 	className="form-control"
							 	placeholder="Username"
							 	value={this.state.username}
							 	name ="username"
							 	// they need to match username = username (target value)
							 	onChange = {this.handleChange.bind(this)}/>
						</div>
						<div className="sign_up">
						 	<input
							 	type="email"
							 	required
							 	className="form-control"
							 	placeholder="Email"
							 	value={this.state.email}
							 	name="email"
							 	onChange = {this.handleChange.bind(this)}/>
						</div>
						<div className="sign_up">
							 <input
							 	type="password"
							 	required
							 	className="form-control"
							 	placeholder="Password"
							 	value={this.state.password}
							 	name="password"
							 	onChange = {this.handleChange.bind(this)}/>
						</div>
						<div className="sign_up">
							<Button
		                        type="submit"
		                        className="btn btn-default">Sign Up
		                    </Button>
		                </div>
					</form>
					<form onClick = {this.handleClick.bind(this)}>
						<Button
	                        type="submit"
	                        className="btn btn-default">Log In
		                </Button>
		            </form>
				</div>
			</div>	
		)
	}
}

class ShowError extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		if (this.props.error === "Failed request") {
			return <div> Request failed. </div>
		} else if (this.props.error === "Username or Email already exists") {
			return <div> Email or Username already exist, please log in. </div>
		}
		return <div></div>
	}
}

//send props to SignUp
const MapStateToProps = (state) => ({user: state.user})

//dispatch the state to DB
const MapDispatchToProps = (dispatch) => bindActionCreators({tempUser, createUserAsync}, dispatch)
const Sign_up = connect(MapStateToProps, MapDispatchToProps)(SignUp)

export default Sign_up


