import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {useCallback, useEffect} from "react";
import {
    addTodolistAC, addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType,
    removeTodolistAC, removeTodolistsTC, setTodolistsAC, TodolistDomainType
} from "../../../state/todolists-reducer";
import {
    addTaskAC, addTaskTC,
    changeTaskStatusAC, changeTaskStatusTC,
    changeTaskTitleAC, changeTaskTitleTC,
    removeTaskAC,
    removeTaskTC
} from "../../../state/task-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskStatuses, todolistsApi, TodolistType} from "../../../api/todolists-api";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {RequestStatusType} from "../../../app/app-reducer";

export const useAppWithRedux = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    //const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    useEffect(() => {
        dispatch(fetchTodolistsTC())// из tl-reducer
    }, []);


    const removeTodolist = useCallback(
        (todolistId: string) => {
            console.log('removeTodolist')
            /*const action = removeTodolistAC(todolistId)// без thunk
            dispatch(action)*/
            const thunk = removeTodolistsTC(todolistId)
            dispatch(thunk)
        }, [dispatch]
    )

    const changeTodolistTitle = useCallback(
        (todolistId: string, newTitle: string) => {
            const thunk = changeTodolistTitleTC(todolistId, newTitle)
            dispatch(thunk)
        }, [dispatch]
    )

    /* const removeTask = useCallback(
         (id: string, todolistId: string )=> {
            const thunk = removeTaskTC(id, todolistId)
             dispatch(thunk)
         },[dispatch]
     )*/

    const removeTask = useCallback(
        function (id: string, todolistId: string) {
            const thunk = removeTaskTC(id, todolistId)
            dispatch(thunk)
        }, [])


    const changeFilter = useCallback(
        (todolistId: string, value: FilterValuesType) => {
            const action = changeTodolistFilterAC(value, todolistId)
            dispatch(action)
        }, [dispatch]
    )

    const addTask = useCallback(
        (todolistId: string, title: string) => {
            //const action = addTaskAC(todolistId, title)
            const thunk = addTaskTC(todolistId, title)
            dispatch(thunk)
        }, [dispatch]
    )

    const changeTasksStatus = useCallback(
        (todolistId: string, taskId: string, status: TaskStatuses) => {
            const thunk = changeTaskStatusTC(taskId, status, todolistId)
            dispatch(thunk)
        }, [dispatch]
    )

    const changeTaskTitle = useCallback(
        (todolistId: string, taskId: string, newTitle: string) => {
            const thunk = changeTaskTitleTC(todolistId, taskId, newTitle)
            dispatch(thunk)
        }, [dispatch]
    )

    const onClickAddTodolist = useCallback((title: string) => {
        const thunk = addTodolistsTC(title)
        dispatch(thunk)
    }, [dispatch])

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
        onClickAddTodolist,
        status
    }
}