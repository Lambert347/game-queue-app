import gameReducer from './game.reducer';

describe('test gameReducer...', () => {
    test('Initial state should be an empty array', () => {
        let action = [];
        let state = undefined;
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual([]);
    })
})
