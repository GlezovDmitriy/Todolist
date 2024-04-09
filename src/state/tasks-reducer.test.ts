import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, tasksReducer} from './task-reducer';
import {TasksStateType} from '../App';
import {removeTaskAC} from "./task-reducer";
import {removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})
test('correct task should be deleted from correct array', () => {
    /*const startState: TasksStateType = {                // выносим выше в beforeEach
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
*/
    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

});
test('correct task should be added to correct array', () => {

    const action = addTaskAC('todolistId2', 'juce')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', false, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].isDone).toBe(false)
    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId2'][2].isDone).toBe(false)
    expect(endState['todolistId1'][0].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId1'][2].isDone).toBe(false)

})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('todolistId2', "2", 'coffe')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('coffe')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: "1", title: "CSS", filter:'all'},
        {id: "2", title: "JS", filter:'all'},
        {id: "3", title: "React",  filter:'all'}
    ],)
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(endState['1']).toStrictEqual([])
})