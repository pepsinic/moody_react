import React from 'react'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import {checkUserAsync, tempUser} from '../store/actions'
import {browserHistory} from "react-router"
import {Button} from 'react-bootstrap'

class LogIn extends React.Component {
	constructor(props){
		super(props)
		this.state = {username: props.user.username, password: props.user.password, error: props.user.error}
	}
	handleChange(e){
		console.log(e.target.value)
		this.setState({[e.target.name]: e.target.value})
	}
	handleSubmit(e){
		e.preventDefault()
		var re = /^[\w ]+$/

        if(!re.test(this.state.username)) {
        	console.log("No special character in your username please")
        } else if (this.state.password.length < 6){
        	console.log("Password must be a least 6 character long, thank you")
    	} else {
        	const username = this.state.username.toLowerCase()
        	const password = this.state.password

        	this.props.checkUserAsync(username, password)
        }
	}

	handleClick(e){
		e.preventDefault()
		const username = this.state.username.slice(0,1).charAt(0).toUpperCase() + this.state.username.slice(1)
        const password = this.state.password
        this.props.tempUser(username, password)
		browserHistory.push('/sign_up')
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
							<button
		                        type="submit"
		                        className="btn btn-default">Log In
		                    </button>
		                </div>
					</form>
					<form onClick = {this.handleClick.bind(this)}>
						<Button
	                        type="submit"
	                        className="btn btn-default">Sign up
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
		} else if (this.props.error === "Email/Password combination not found") {
			return <div> Email/Password combination not found </div>
		}
		return <div></div>
	}
}
const LogInMapStateToProps = (state) => ({user: state.user})
const checkUserMapDispatchToProps = (dispatch) => bindActionCreators({tempUser, checkUserAsync}, dispatch)
const Log_in = connect(LogInMapStateToProps, checkUserMapDispatchToProps)(LogIn)

export default Log_in


