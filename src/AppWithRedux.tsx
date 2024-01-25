import React, {useReducer, useState} from 'react';
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
import {useDispatch} from "react-redux";

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
    let todolistID1 =v1()
    let todolistID2 = v1()

    const dispatch = useDispatch();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
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
    })
    console.log(todolists)

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatch(action)
    }
    function removeTask(todolistId: string, id: string) {
        const action = removeTaskAC(id,todolistId)
        dispatch(action)
    }
    function changeFilter(todolistId: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }
    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }
// function addTask можно записать (сократьть) как:
    /*function addTask(title:string) {
        setTasks([...tasks, {id: crypto.randomUUID(), title: title, isDone: false}])
    }
    */

    /*function changeTasksStatus(id:string, isDone: boolean){
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }

    }*/
    function changeTasksStatus(todolistId: string, taskId: string, newIsDoneValue: boolean) {
        const action = changeTaskStatusAC(taskId,newIsDoneValue,todolistId)
        dispatch(action)
    }
    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        const action = changeTaskTitleAC(todolistId,taskId, newTitle)
        dispatch(action)
    }
    function onClickAddTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

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
                                if (el.filter === 'active') {
                                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone) // сокращенно: !task.isDone -это тоже самое что и: task.isDone === false
                                }
                                if (el.filter === 'completed') {
                                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                                }
                                if (el.filter === 'delete all') {
                                    tasksForTodolist = allTodolistTasks.filter(task => (!task.isDone && task.isDone))
                                }
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
