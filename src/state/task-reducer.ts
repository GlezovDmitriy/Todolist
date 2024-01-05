import {TaskType} from "../Todolist";
import {TasksStateType} from "../App";
import * as crypto from "crypto";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string,
        taskId: string
    }
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    payload:{
        todolistId: string,
        title: string
    }
}
export type SecondActionType = {
    type: '2'
}

type ActionsType = RemoveTaskActionType | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            const task = state[action.payload.todolistId]
            const filteredTasks = task.filter(t=>t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK':{
            const stateCopy = {...state}
            const newTask = {
                id:crypto.randomUUID(),
                title: action.payload.title,
                isDone: false,
            }
            let tasks = state[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = [newTask, ...tasks]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId:string, todolistId: string):RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', payload: {todolistId, taskId}}
}
export const addTaskAC = (todolistId: string, title: string):AddTaskActionType =>{
return {type: 'ADD-TASK', payload:{todolistId, title}}
}
export const secondAC = (title: string) => {
    return { type: ''}
}