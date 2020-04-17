export const LOGGED_USER = 'LOGGED_USER'

export function loggedUser(loggedUser){
    return {
        type:LOGGED_USER,
        loggedUser,

    }
}
