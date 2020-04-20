import {RECEIVE_USERS} from '../actions/users'
import { ADD_QUESTION,ADD_ANSWER } from '../actions/questions'


export default function users (state={},action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }
        case ADD_QUESTION:
            const {id,author} =action.question 
            return {
                ...state,
                ...state[author].questions.push(id),
                
        }
        case ADD_ANSWER:
            const {answer} = action
        return {
            ...state,
            [answer.authedUser]: {
              ...state[answer.authedUser],
              answers: {
                ...state[answer.authedUser].answers,
                [answer.qid]: answer.ans
              }
            }
    
            }

        default:
            return state
    }
}
