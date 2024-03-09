import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {PropsType, TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {AppBarFC} from "./components/AppBarFC";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {useAppWithRedux} from "./components/AppWithRedux/hooks/useAppWithRedux";

export type FilterValuesType = 'completed' | 'all' | 'active' | 'delete all'
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MenuIcon() {
    return null;
}

function AppWithRedux() {
    console.log("App")
    const {todolists,
        tasks,
        removeTodolist,
        changeTaskTitle,
        changeTasksStatus,
        addTask,
        removeTask,
        changeFilter,
        changeTodolistTitle,
        onClickAddTodolist
    } = useAppWithRedux()
/*    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


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

// function addTask можно записать (сократьть) как:
    /!*function addTask(title:string) {
        setTasks([...tasks, {id: crypto.randomUUID(), title: title, isDone: false}])
    }
    *!/

    /!*function changeTasksStatus(id:string, isDone: boolean){
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }

    }*!/
    const changeTasksStatus = useCallback(
        (todolistId: string, taskId: string, newIsDoneValue: boolean)=>{
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
    },[dispatch])*/

    return (
        <>
            <div className='App'>
                {/*<Box sx={{ flexGrow: 1 }}>*/}
                <AppBarFC/>
                {/*</Box>*/}
                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={onClickAddTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todolists.map(el => {
                                let allTodolistTasks = tasks[el.id] // копия  массива тасок
                                let tasksForTodolist = allTodolistTasks


                                return <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={el.id}
                                            todolistId={el.id}
                                            title={el.title}
                                            filter={el.filter}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTasksStatus={changeTasksStatus}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>

                            })
                        }
                    </Grid>


                </Container>

            </div>
        </>


    );
}

export default AppWithRedux;
