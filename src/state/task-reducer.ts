import {TasksStateType,} from "../components/AppWithRedux/AppWithRedux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC, SetTodolistsActionType, /*todolistID1, todolistID2*/
} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string,
        taskId: string
    }
}
export type AddTaskActionType = {
    type: 'ADD-TASK',

    task: TaskType
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
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
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
            /*const newTask = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                addedDate: '',
                order: 0, description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '',
                todoListId: action.payload.todolistId
            }*/
            let tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
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
            stateCopy[action.todolist.id] = []

            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl => {
                stateCopy[tl.id] = []
            }))
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}}
}
/*export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', payload: {todolistId, title}}
}*/
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
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
export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        debugger
        todolistsApi.deleteTasks( todolistId, taskId)
            .then(res => {
                debugger
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(todolistId, title)
            .then(res => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}
export const changeTaskStatusTC = (taskId: string,
                                   status: TaskStatuses,
                                   todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('TASK NOT FOUND!')
            return
        }

        const model: UpdateModelType = {
            description: task.description,
            title: task.title,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
            /* /////////////////// либо чтобы не определять все свойства:
             ...task,     // берем все - копируем
             status: status    // переопределяем статус*/
        }
        todolistsApi.updateTask(todolistId, taskId, model)
            .then(res => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
    }
}
export const changeTaskTitleTC = (todolistId: string,
                                  taskId: string,
                                  title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('TASK NOT FOUND!')
            return
        }

        const model: UpdateModelType = {
            description: task.description,
            title: title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
            /* /////////////////// либо чтобы не определять все свойства:
             ...task,     // берем все - копируем
             title: title,    // переопределяем title*/
        }
        todolistsApi.updateTask(todolistId, taskId, model)
            .then(res => {
                const action = changeTaskTitleAC(todolistId, taskId, title)
                dispatch(action)
            })
    }
}
