//get the id of the emotion as state.params => "/comment/:id"

import React from 'react'
import { Link, browserHistory  } from 'react-router'
import {bindActionCreators} from "redux"
import {connect, dispatch} from 'react-redux'
import {user, addEmotion, createCommentsAsync } from '../store/actions'
import {Row, Col, Grid, FormGroup, Button, FormControl} from 'react-bootstrap'

class Comment extends React.Component{
	constructor(props){
		super(props)
		this.state = props
		this.id = props.params.id
		console.log(this.id)
		console.log('this emotion')
		console.log(this.emotion)
	}

	handleClick(e){
		e.preventDefault()
		browserHistory.push('/list')
	}

	handleChange(e) {
		console.log(e.target.value)
		this.setState({comments: e.target.value})
	}

	handleSubmit(e) {
		e.preventDefault()
		const comments = this.state.comments
		const id = this.id
		console.log(id, comments)
		this.props.createCommentsAsync(id, comments)
		browserHistory.push('/list')
	}

	handleLogOut(e){
		e.preventDefault()
		localStorage.removeItem("token")
		browserHistory.push('/log_in')
	}

	render(){
		this.emotion = this.props.emotion.filter((emotion, i) => this.id == emotion._id )[0]
		if (!this.emotion) return <div>Loading...</div>
		return (
			<div>
				<div className="nav">
				 	<h2>Hi {this.emotion.name}, do you want to add a comment to your mood? </h2>
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
			 		<ShowEmotion emotion = {this.emotion.emotion} time = {this.emotion.time}/>
			 	</div>
			 	<div>
					<br/>
					<form onSubmit = {this.handleSubmit.bind(this)}>
						<FormGroup controlId="formControlsTextarea">
					      <FormControl type="text" componentClass="textarea" autoFocus onChange ={this.handleChange.bind(this)}/>
					      	<Button type="submit">Submit</Button>
					    </FormGroup>
				    </form>
				</div>
			</div>
		)
	}
}

var ShowEmotion = function (props) {
		return  (
			<div>
				<Grid>
					<Row> 
						<Col xsOffset={3} xs={3} md={3} lg={6}>
							<img src={"/public/img/"+props.emotion+".png"} className="image"/>
						</Col>	
						<Col xs={6} md={6} lg={6}>
							<h3>Mood created on {props.time}</h3>
						</Col>	
					</Row>	
				</Grid>
			</div>
		)
} 

const CommentMapStateToProps = (state) => ({user: state.user, emotion: state.emotion})
const MapDispatchToProps = (dispatch) => bindActionCreators({createCommentsAsync}, dispatch)




export default connect(CommentMapStateToProps, MapDispatchToProps)(Comment)



