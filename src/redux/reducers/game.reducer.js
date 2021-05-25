const gameReducer = (state =[], action) => {
    switch (action.type) {
        case 'SET_GAMES':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default gameReducer;