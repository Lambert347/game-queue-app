const genreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRE':
            return action.payload;
        default:
            return state;
    }
};

export default genreReducer;