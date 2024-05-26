import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        error: null,
        status:'idle'
    };
})
test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('IT IS ERROR'))
    expect(endState.error).toBe('IT IS ERROR')
});
test('correct status  should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))
    expect(endState.status).toBe('loading')
});