import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
/*type ActionType = {
    type: string
    [key: string]: any
}*/
/*export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}*/
// Можно определить как ниже, только в АС (снизу) убрать тип и дописать as const
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
/*export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}*/
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: TodolistType[],

}
type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

/*export let todolistID1 =v1()          ///////////////переходим на данные с сервера
export let todolistID2 = v1()
const initialState:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]*/

const initialState: Array<TodolistDomainType> = []
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
/*export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistsApi.getTodoLists().then(res => {
        dispatch(setTodolistsAC(res.data.map( tl => ({...tl, filter: 'all' as const}))))
    })
}*/

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            /*return [{id: action.todolistId, title: action.title, filter: 'all',order: 0,
                addedDate: ''}, ...state]*/
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let stateCopy = [...state]
            /*const todolist = stateCopy.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy*/
            let todolist = stateCopy
            console.log(Array.isArray(todolist))
            stateCopy = todolist.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl)
            return stateCopy
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(el => el.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }           // фильтр - это свойство,  а не метод!!!
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl, filter: 'all', entityStatus: 'idle'
                }
            })
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.entityStatus = action.status
            }
            return [...state]
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: newTitle, id: id}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
export const setTodolistsAC = (todolists: TodolistDomainType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status,}) as const
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getTodoLists().then(res => {
            dispatch(setTodolistsAC(res.data.map(tl => ({...tl, filter: 'all', entityStatus: 'idle' as const}))))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsApi.removeTodoLists(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createTodoLists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, newTitle: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.updateTodoLists(id, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(id, newTitle))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

type ThunkDispatchType = Dispatch<ActionType | SetAppStatusActionType>