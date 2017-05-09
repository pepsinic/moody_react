import React from 'react'
import {connect, dispach} from 'react-redux'
import { Link, browserHistory } from 'react-router'
import {bindActionCreators} from "redux"
import dateformat from 'dateformat'
import {addUser, addEmotion, addComment, deleteEmotionsAsync} from '../store/actions'
import {Row, Col, Grid, Button} from 'react-bootstrap'

class List extends React.Component{
	constructor(props){
		super(props)
		this.state = props
		this.username = this.state.user.username
	}
	handleClick(e){
		e.preventDefault()
		browserHistory.push('/emotion')
	}
	handleLogOut(e){
		e.preventDefault()
		localStorage.removeItem("token")
		browserHistory.push('/log_in')
	}

	render(){
		console.log(this.props.emotion.length)
		return (
			<div>
				<div className="nav">
				 	<h2>Hi {this.username}, here are all your emotions: </h2>
			 	</div>
			 	<div>
			 		<Button
			 				type="submit"
	                        className="btn btn-default"
	                        onClick = {this.handleLogOut.bind(this)}
	                        >Log out
	                </Button>
			 		<Button onClick = {this.handleClick.bind(this)}>Back</Button>
			 	</div>	
			 	<div>
				 	{this.props.emotion.map((emotion, i) =>
				 		<ConnectShowEmotion key = {emotion._id} id = {emotion._id} emotion = {emotion.emotion} time = {emotion.time} comments = {emotion.comments}/> )
				 	}
				</div>
			</div>
		)
	}
}

// !!!!!! ATTENTION <ConnectShowEmotion key = {emotion._id} It was not updating because the key was not changing 
//so we must put as key the emotion id as this is the changing element.

class ShowEmotion extends React.Component{
	constructor(props){
		super(props)
		// this.emotion = props.emotion
		// this.id= props.id

		// this.time = dateformat(props.time, 'dddd, mmmm dS, yyyy, h:MM:ss TT')

		// this.comment = props.comment
		// this.image = "/public/img/"+props.emotion+".png"
		// this.clickable = true

	}

	handleClick(e){
		e.preventDefault()
		if (!this.clickable) return 
		const self = this	
		setTimeout(() => {self.clickable = true}, 1000)
		var id = this.id
			
		this.props.deleteEmotionsAsync({id})
		browserHistory.push('/list')
	}

	render(){
		this.emotion = this.props.emotion
		this.id= this.props.id
		this.time = dateformat(this.props.time, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
		this.comments = this.props.comments
		this.image = "/public/img/"+this.props.emotion+".png"
		this.clickable = true

		return (
			<div>
				<Grid>
					<Row> 
						<Col xs={3} md={3} lg={6}>
							<h3>Mood created on {this.time}</h3>
						</Col>	
						<Col xs={3} md={3} lg={6}>
							<Link to={"/comment/" + this.id}><img src={this.image} className="grow"/></Link>
							<Button bsSize="xsmall" 
									className="glyphicon glyphicon-remove-circle" 
									aria-label="delete"
									onClick = {this.handleClick.bind(this)}>
							</Button>
						</Col>	
						<Col xs={6} md={6} lg={6}>
							<h3>{this.id} -> {this.comments}</h3>
						</Col>	
					</Row>	
				</Grid>
			</div>
		)
	}
}

//{this.time} is a string when you check in the store, it can create problems...

//getting the informations or "props" from state :
const ListsMapStateToProps = (state) => ({user: state.user, emotion: state.emotion})

const ShowEmoDispatchToProps = (dispatch) => bindActionCreators({deleteEmotionsAsync}, dispatch)
const ConnectShowEmotion = connect(null, ShowEmoDispatchToProps)(ShowEmotion)

export default connect(ListsMapStateToProps)(List)
//shorter version to connect everything and just export "List"


