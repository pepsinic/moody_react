// CHANGED  props.user.map => state.user.map 
// CHALLENGE  make the moving face: http://jsbin.com/ikeze5/137/edit?html,js,output

import React from 'react'
import { Link } from 'react-router'
import {bindActionCreators} from "redux"
import {connect, dispatch} from 'react-redux'
import {addUser, createEmotionsAsync} from '../store/actions'
import { browserHistory } from 'react-router'
import {Row, Col, Grid, Button} from 'react-bootstrap'

class Emotions extends React.Component {
	constructor(props){
		super(props)
		this.state = props
		this.username = this.state.user.username.slice(0,1).charAt(0).toUpperCase() + this.state.user.username.slice(1)
		this.clickable = true
	}
	handleClick(e){
		e.preventDefault()
		browserHistory.push('/list')
	}

	handleSubmit(event){
		event.preventDefault()
		if (!this.clickable) return
		// the line before mean if not clickable do return "nothing" else is implicit now
		
		const emotion = event.target.getAttribute("value")
		var seconds = Date.now()
		var time = new Date
		
		// change the state of clickable into false so that the user can click 
		// we change 'this' in 'self' to be able to rechange clickable after 1 sec = 1000
		// we set a timeout of the time the clickable button is shutdown in "false mode"
		this.clickable = false
		const self = this
		setTimeout(() => {self.clickable = true}, 1000)

		var name = this.state.user.username
		var comments = ""
		this.props.createEmotionsAsync({name, emotion, seconds, time, comments})
		browserHistory.push('/list')
	}

	handleLogOut(e){
		e.preventDefault()
		localStorage.removeItem("token")
		browserHistory.push('/log_in')
	}

	render(){
		console.log(this.state)
		return (
			<div>
				<div className="nav">
		            <h2>Hi {this.username}, how are you feeling ?</h2>
		        </div>
		        <div>
			 		<Button
		 				type="submit"
                        className="btn btn-default"
                        onClick = {this.handleLogOut.bind(this)}
                        >Log out
	                </Button>
			 		<Button onClick = {this.handleClick.bind(this)}>To list</Button>
			 	</div>	
		        <div>
		        	<Grid>
						<Row className="row"> 
							<img src="/public/img/1.png" value="1"  onClick = {this.handleSubmit.bind(this)} className="grow"/>
						</Row>
						<Row className="row"> 
							<img src="/public/img/2.png" value="2" onClick = {this.handleSubmit.bind(this)} className="grow"/>	
						</Row>
						<Row className="row"> 
							<img src="/public/img/3.png" value="3" onClick = {this.handleSubmit.bind(this)} className="grow"/>
						</Row>	
					</Grid>
				</div>
			</div>
		)
	}
}

const EmotionsMapStateToProps = (state) => ({user : state.user})
const MapDispatchToProps = (dispatch) => bindActionCreators({createEmotionsAsync}, dispatch)
//you don't need to write EmotionsMapStateToProps => just MapStateToProps is good!
const Emotion = connect(EmotionsMapStateToProps, MapDispatchToProps)(Emotions)


export default Emotion

