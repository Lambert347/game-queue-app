const queueReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_GAMES':
            return action.payload;
        // case 'CHANGE_ORDER':
        //     return action.payload;
        default:
            return state;
    }
};

export default queueReducer;