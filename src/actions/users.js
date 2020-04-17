export const RECEIVE_USERS = 'RECEIVE_USERS'


export default function receiveUsers(users){
    return {
        type:RECEIVE_USERS,
        users
    }
}
