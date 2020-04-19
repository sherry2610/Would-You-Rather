import { _saveQuestion } from "../_DATA";


export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION"
//export const UPDATE_QUESTION = "UPDATE_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
// function updateQuestions(question){
//     return {
//         type:UPDATE_QUESTION,
//         question,
//     }
// }


export function handleAddQuestion(optionOneText,optionTwoText) {
    return (dispatch, getState) => {
      const { loggedUser, users } = getState()
      const uid = Object.keys(users)
      const currentUser = Object.values(loggedUser).join("")
      const author = uid.filter((uid) => {
        if (users[uid].name === currentUser) {
          return users[uid].answers;
        }
      })
      
      return _saveQuestion({
        author,
        optionOneText,
        optionTwoText,
      }).then((question) =>{
        dispatch(addQuestion(question))
        // dispatch(receiveQuestions(question))
        // dispatch(receiveQuestions(question))
        })
          
      }
  }
  