import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": 'bc698716-52a0-4948-9063-299272c3de30'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})
type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[],
    messages: string[],
    data: T
}
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export enum TaskStatuses {
    New,
    InProgress = 1,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle = 1,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksType = {
    totalCount: number
    error: string | null
    items: TaskType[]
}
type DeleteTasksType = {
    resultCode: number
    messages: string[]
    data: {}
}
type UpdateModelType = {
    description: string
    title: string
    //completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export const todolistsApi = {
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists')               ///instance
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    updateTodoLists(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    removeTodoLists(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    ///  for tasks
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)               ///instance
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<DeleteTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateModelType) {
        return instance.put<DeleteTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    /* createTodoLists(title: string){
 return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title}, settings)
     },
     updateTodoLists(todolistId: string, title: string){
 return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title}, settings)
     },
     removeTodoLists(todolistId:string){
 return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
     }*/


}