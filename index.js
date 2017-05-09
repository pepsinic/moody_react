import React from 'react'
import { render } from 'react-dom'
import { Provider} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import store from "./store/store_index"
import Sign_up from './components/sign_up'
import Log_in from './components/log_in'
import Emotion from './components/emotion'
import Comment from './components/comment'
import List from './components/list'
import Calendar from './components/calendar'

		
class Main extends React.Component {
	requireAuth(nextState, replace) {
  		if (localStorage.getItem('token') == null) {
    		replace({
	      	pathname: '/log_in'
	    }) 
	  }
	}
	render(){
		return (
			<Provider  store ={store} >
				<Router history = {browserHistory}>
					<Route path="/" component={Sign_up}/>
					<Route path="/sign_up" component={Sign_up} />
					<Route path="/log_in" component={Log_in} />
					<Route path="/emotion" component={Emotion} />
					<Route path="/comment/:id" component={Comment} onEnter={this.requireAuth.bind(this)}/>
					<Route path="/list" component={List} onEnter={this.requireAuth.bind(this)}/>
					<Route path="/calendar" component={Calendar} onEnter={this.requireAuth.bind(this)}/>
				</Router>
	        </Provider>
        )
	}
}


store.subscribe(() => console.log("STORE: ", store.getState()))

render (
		<Main/>,
    	document.getElementById("app")
)


//------------- SPECIAL INFORMATION for ROUTER problems: ---------------

    // "start": "webpack-dev-server --inline --content-base . --history-api-fallback"  
    // => we must tell him that when ever he doesn't know he should go back to index and check the Router
	// the version of react-router 4.0.0 didn't work with the tutorial lessons.webpack !!!

