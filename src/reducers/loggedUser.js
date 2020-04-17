import { LOGGED_USER, LOG_OUT } from "../actions/loggedUser";



export default function loggedUser(state=null, action){
    switch(action.type){
        case LOGGED_USER:
            return {
                ...action.loggedUser
            }
        case LOG_OUT:
            return {
                ...action.logout
            }
    }
}