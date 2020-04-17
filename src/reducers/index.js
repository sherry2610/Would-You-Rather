import users from './users'
import questions from './questions'
import loggedUser from './loggedUser'
import {combineReducers} from  'redux'

export default combineReducers({
    loggedUser,
    users,
    questions,
})
