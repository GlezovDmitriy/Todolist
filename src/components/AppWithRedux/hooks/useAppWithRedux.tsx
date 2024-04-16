import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {useCallback, useEffect} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistsTC,  FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType
} from "../../../state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskTC
} from "../../../state/task-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskStatuses, todolistsApi} from "../../../api/todolists-api";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";

export const useAppWithRedux = ()=>{
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    //const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {

        dispatch(fetchTodolistsTC())// из tl-reducer
    }, []);



    const removeTodolist= useCallback(
        (todolistId: string) =>{
            const action = removeTodolistAC(todolistId)
            dispatch(action)
        },[dispatch]
    )

    const changeTodolistTitle= useCallback(
        (todolistId: string, newTitle: string)=> {
            const action = changeTodolistTitleAC(newTitle, todolistId)
            dispatch(action)
        },[dispatch]
    )

    const removeTask = useCallback(
        (todolistId: string, id: string)=> {
           const thunk = removeTaskTC(id, todolistId)
            dispatch(thunk)
        },[dispatch]
    )

    const changeFilter=useCallback(
        (todolistId: string, value: FilterValuesType)=> {
            const action = changeTodolistFilterAC(value, todolistId)
            dispatch(action)
        },[dispatch]
    )

    const addTask = useCallback(
        (todolistId: string, title: string) =>{
            const action = addTaskAC(todolistId, title)
            dispatch(action)
        },[dispatch]
    )

    const changeTasksStatus = useCallback(
        (todolistId: string, taskId: string, status:TaskStatuses)=>{
            const action = changeTaskStatusAC(taskId, status, todolistId)
            dispatch(action)
        },[dispatch]
    )

    const changeTaskTitle= useCallback(
        (todolistId: string, taskId: string, newTitle: string)=> {
            const action = changeTaskTitleAC(todolistId, taskId, newTitle)
            dispatch(action)
        },[dispatch]
    )

    const onClickAddTodolist=useCallback((title: string)=> {
        const action = addTodolistAC(title)
        dispatch(action)
    },[dispatch])
    return {
        todolists,
        tasks,
        removeTodolist,
        changeTaskTitle,
        changeTasksStatus,
        addTask,
        removeTask,
        changeFilter,
        changeTodolistTitle,
        onClickAddTodolist
    }
}