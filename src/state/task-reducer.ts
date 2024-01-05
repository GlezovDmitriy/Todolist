import {TaskType} from "../Todolist";
import {TasksStateType} from "../App";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string,
        taskId: string
    }
    /*todolistId: string
    taskId: string*/
}
export type SecondActionType = {
    type: '2'
}

type ActionsType = RemoveTaskActionType | SecondActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            const task = state[action.payload.todolistId]
            const filteredTasks = task.filter(t=>t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks
            return stateCopy
        }
        case '2':{
            return {...state}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId:string, todolistId: string):RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', payload: {todolistId, taskId}}
}
export const secondAC = (title: string) => {
    return { type: ''}
}