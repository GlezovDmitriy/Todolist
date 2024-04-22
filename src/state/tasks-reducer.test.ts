import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, setTasksAC, tasksReducer} from './task-reducer';
import {TasksStateType} from '../App';
import {removeTaskAC} from "./task-reducer";
import {removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import axios from "axios";
let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistId1"},
            {id: "2", title: "JS", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistId1"},
            {id: "3", title: "React", status: TaskStatuses.New, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistId1"}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistId2"},
            {id: "2", title: "milk", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistId2"},
            {id: "3", title: "tea", status: TaskStatuses.New, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistId2"}
        ]
    };
})
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
});
test('correct task should be added to correct array', () => {

   /* const action = addTaskAC('todolistId2', 'juce')*/
    const action = addTaskAC({
            todoListId: 'todolistId2',
            id: "ef6fe64f64w",
            title: 'juce',
            status: TaskStatuses.New,
            addedDate: '',
            order: 0, description: '', priority: 0, startDate: '',
            deadline: '',
    }
        )
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)


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
        {id: "1", title: "CSS", filter:'all', order:0, addedDate:''},
        {id: "2", title: "JS", filter:'all', order:0, addedDate:''},
        {id: "3", title: "React",  filter:'all', order:0, addedDate:''}
    ],)
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(endState['1']).toStrictEqual([])
})
test('tasks should be added for todolists', () => {
    const action = setTasksAC( startState['todolistId1'], 'todolistId1')
    const endState = tasksReducer({
        'todolistId2':[],
        'todolistId1':[]
    }, action)


    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})