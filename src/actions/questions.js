import { _saveQuestion, _saveQuestionAnswer } from "../_DATA";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

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

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { loggedUser, users } = getState();
    const uid = Object.keys(users);
    const currentUser = Object.values(loggedUser).join("");
    const author = uid.filter((uid) => {return (users[uid].name === currentUser) ? users[uid].answers :''})

    return _saveQuestion({
      author,
      optionOneText,
      optionTwoText,
    }).then((question) => {
      dispatch(addQuestion(question));
    });
  };
}

function addAnswer(answer) {
  return {
    type: ADD_ANSWER,
    answer,
  }
}



export function handleAddAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(addAnswer({ authedUser, qid, answer }))
    
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
   }
}
