const queueReducer = (state = [], action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'SET_USER_GAMES':
            return action.payload;
        // case 'SET_NEW_QUEUE':
        //     return action.payload
        default:
            return state;
    }
};

export default queueReducer;