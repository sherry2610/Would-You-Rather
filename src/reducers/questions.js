import { RECEIVE_QUESTIONS   } from '../actions/questions'
import { ADD_QUESTION,ADD_ANSWER } from '../actions/questions'


export default function questions (state={},action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }
        case ADD_QUESTION:
            
            return {
                ...state,
                [action.question.id]:action.question
            }
        case ADD_ANSWER:
            const {authedUser,qid,answer} = action.answer
            
            return {
                ...state,
                [qid]: {
                  ...state[qid],
                  [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                  }
                }
        
            }
        default:
            return state
    }
}