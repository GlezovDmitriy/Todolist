import {FilterValuesType, TodolistType} from "../components/AppWithRedux/AppWithRedux";
import {v1} from "uuid";
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
type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export let todolistID1 =v1()
export let todolistID2 = v1()
const initialState:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
export const todolistsReducer = (state: Array<TodolistType> = initialState , action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [ {id: action.todolistId, title: action.title, filter: 'all'}, ...state]
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
            stateCopy = todolist.map(tl=> tl.id === action.id
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

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: newTitle, id: id}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}