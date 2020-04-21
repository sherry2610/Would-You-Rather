import {getInitialData} from '../_DATA'
import {receiveUsers} from './users'
import {receiveQuestions} from './questions'




export function fetchInitialData(){
    return (dispatch)=>{
        return getInitialData()
        .then(({users, questions})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
        
    }
}


