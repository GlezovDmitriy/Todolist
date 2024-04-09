import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {useCallback, useEffect} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType
} from "../../../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../state/task-reducer";
import {FilterValuesType, TasksStateType} from "../AppWithRedux";
import {todolistsApi} from "../../../api/todolists-api";

export const useAppWithRedux = ()=>{
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        todolistsApi.getTodoLists()
            .then(res =>{
                const action = setTodolistsAC(res.data)
                dispatch(action)
            })
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
            const action = removeTaskAC(id, todolistId)
            dispatch(action)
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
            const action = changeTaskStatusAC(taskId, newIsDoneValue, todolistId)
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