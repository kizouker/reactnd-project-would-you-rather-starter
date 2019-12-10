export const GET_INITIAL_QUESTIONS = 'GET_INITIAL_QUESTIONS'

function get_initial_questions (questions){
    return {    
            type: GET_INITIAL_QUESTIONS,
            questions
        }
}



//new fn that calls the api and gets the initial questions
// aysnc middleware
// dispatch
// and then return the action above