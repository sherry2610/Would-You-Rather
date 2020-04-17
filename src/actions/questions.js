export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'


export default function receciveQuestions(questions){
    return {
        type:RECEIVE_QUESTIONS ,
        questions
    }
}
