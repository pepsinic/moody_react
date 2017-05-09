//show month with emotions and dates...

import React from 'react'
import {connect} from 'react-redux'
import { render } from 'react-dom';
import {user, addEmotion} from '../store/actions'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import VirtualList from 'react-tiny-virtual-list';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);


class Calendar extends React.Component{
	constructor(){
		super()
	}
	render(){
		return (
			<div>
				<InfiniteCalendar 
				width={400}
    			height={600}
			    selected={today}
			    disabledDays={[0,6]}
			    minDate={lastWeek}/>
			</div>
		)
	}
}

export default Calendar