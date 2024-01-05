import {FilterValuesType, TodolistType} from "../App";

/*type ActionType = {
    type: string
    [key: string]: any
}*/
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter:  FilterValuesType
}
type ActionType = RemoveTodolistActionType
| AddTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: '5', title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return {...state}
        }
            case 'CHANGE-TODOLIST-FILTER':{
                let todolist = state.find(el => el.id === action.id)
                if (todolist) {
                    todolist.filter = action.filter}           // фильтр - это свойство,  а не метод!!!
                   return [...state]

            }

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType=>{
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = ( title: string): AddTodolistActionType=>{
    return {type: 'ADD-TODOLIST', title: title}
}
export  const ChangeTodolistTitleAC = (newTitle: string, id: string):ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: newTitle, id: id}
}
export  const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string):ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}