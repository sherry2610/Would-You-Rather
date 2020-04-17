export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'


export function receciveQuestions(questions){
    return {
        type:RECEIVE_QUESTIONS,
        questions
    }
}
