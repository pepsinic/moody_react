//the Redux dev tools must be also adding in the browser with a plugin : ReduxDevTools
//https://github.com/zalmoxisus/redux-devtools-extension

import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import {user, emotion} from "./reducers"
import thunk from 'redux-thunk'

import {addMultipleEmo, fetchEmotionsAsync} from './actions'

// WE USE THIS INFORMATION TO TEST BEFORE THERE WAS A DB connection
// const pedroEmotion0 = ["pedro","10","Thu Apr 06 2017 10:05:40 GMT+0200 (CEST)",1491465940847, ""]
// const pedroEmotion1 = ["pedro","6","Thu Apr 07 2017 09:10:43 GMT+0200 (CEST)",1491465959847, ""]
// const pedroEmotion2 = ["pedro","4","Thu Apr 02 2017 12:30:22 GMT+0200 (CEST)",14914659589023, ""]
// store.dispatch(addMultipleEmo([pedroEmotion0,pedroEmotion1, pedroEmotion2]) ) 


const middlewares = [thunk];
const enhancers = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(combineReducers({user, emotion}), enhancers)

// IMPORTANT : we create a store.dispatch(fetchEmotionsAsync()) everytime we call the DB when there is a reload!!!  ASK PEDRO
// But in this case is not good we get the token set in emotion, because of this fetch!!!!

store.dispatch(fetchEmotionsAsync())

export default store


