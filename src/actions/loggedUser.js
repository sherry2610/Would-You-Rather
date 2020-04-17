export const LOGGED_USER = 'LOGGED_USER'
export const LOG_OUT = 'LOG_OUT'

export function loggedUser(loggedUser){
    return {
        type:LOGGED_USER,
        loggedUser,

    }
}

const logout = null
export function logOut(){
    return {
        type:LOG_OUT,
        logout
    }
}