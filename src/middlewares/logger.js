const logger = (store) => (next) => (action) =>{
    console.group(action.type)
    console.log('the action:', action)
    const result = next(action)
    console.log("the current state",store.getState())
    return result
}

export default logger