import {getInitialData} from '../_DATA'
import receiveUsers from './users'
import receiveQuestions from './questions'
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


