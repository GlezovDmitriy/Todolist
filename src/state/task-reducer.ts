
import {TasksStateType, } from "../components/AppWithRedux/AppWithRedux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC, SetTodolistsActionType, /*todolistID1, todolistID2*/
} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string,
        taskId: string
    }
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        todolistId: string,
        title: string
    }
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId: string,
        taskId: string,
        status: number
    }
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistId: string,
        taskId: string,
        title: string,
    }
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
/*const initialState:TasksStateType = {         // до подключения сервера
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: " book HTML&CSS", isDone: true},
        {id: v1(), title: " book JS", isDone: true},
        {id: v1(), title: " book ReactJS", isDone: false},
        {id: v1(), title: " book Git", isDone: true},
        {id: v1(), title: " book Figma", isDone: false},
    ]
}*/
const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const task = state[action.payload.todolistId]
            const filteredTasks = task.filter(t => t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',
                todoListId: action.payload.todolistId
            }
            let tasks = state[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            /*const stateCopy = {...state}                             // БЫЛО
            let todolistTasks = stateCopy[action.payload.todolistId]  // новая переменная с нужным массивом(объектом) по ID
            let task = todolistTasks.find(el => el.id === action.payload.taskId)
            // изменяем значение isDone таски если она нашлась
            if (task) {
                task.isDone = action.payload.isDone
            }
            stateCopy[action.payload.todolistId] = [...todolistTasks] // копия, т.к. изменили массив
            return stateCopy*/
            const stateCopy = {...state}
            let todolistTasks = stateCopy[action.payload.todolistId]  // новая переменная с нужным массивом(объектом) по ID
            stateCopy[action.payload.todolistId] = todolistTasks.map(t => t.id === action.payload.taskId
                ? {...t, status: action.payload.status}
                : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let todolistTasks = stateCopy[action.payload.todolistId]  // новая переменная с нужным массивом(объектом) по ID
            stateCopy[action.payload.todolistId] =
                todolistTasks.map(t => t.id === action.payload.taskId
                    ? {...t, title: action.payload.title}
                    : t)
            return stateCopy

        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl =>{
                stateCopy[tl.id] = []
            }))
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}}
}
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', payload: {todolistId, title}}
}
export const changeTaskStatusAC = (taskId: string,
                                   status: number,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS', payload: {
            todolistId, taskId, status
        }
    }
}
export const changeTaskTitleAC = (todolistId: string,
                                  taskId: string,
                                  title: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE", payload: {
            todolistId, taskId, title
        }
    }
}
