import {getInitialData, _getUsers, _getQuestions} from '../_DATA.js'
import {receiveUsers} from './users'
import {receiveQuestions} from './questions'
//import {loggedUser} from './authedUser'


export function fetchInitialData(){
    return (dispatch)=>{
        return getInitialData()
        .then(({users, questions})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}


