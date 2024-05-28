import React, {useReducer, useState} from 'react';
import './App.css';
import {PropsType,  Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {AppBarFC} from "./components/AppBarFC";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function MenuIcon() {
    return null;
}

function AppWithReducers() {
    let todolistID1 =v1()
    let todolistID2 = v1()


    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,
        [
            {id: todolistID1, title: 'What to learn', filter: 'all', addedDate:'', order:0, entityStatus: 'idle' },
            {id: todolistID2, title: 'What to buy', filter: 'all', addedDate:'', order:0, entityStatus: 'idle'},
        ]
    )
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:todolistID1},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:todolistID1},
            /*{id: v1(), title: "JS", status: TaskStatuses.Completed, addedDate:'', order:0},*/

        ],
        [todolistID2]: [
            {id: v1(), title: "REACT", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:todolistID2},
            {id: v1(), title: "HTML", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:todolistID2},

        ]
    })
    console.log(todolists)

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action) //отправляем в todolistsReducer
        dispatchToTasksReducer(action)
        /*setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
        console.log(tasks[todolistID2])*/
    }
    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatchToTodolistsReducer(action) //отправляем в todolistsReducer
        /*const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            console.log(todolist.title)
            setTodolists([...todolists])
            console.log(todolists)
        }*/
    }
    function removeTask(todolistId: string, id: string) {
        const action = removeTaskAC(id,todolistId)
        dispatchToTasksReducer(action)
        /*let todolistTasks = tasks[todolistId]  // новая переменная с нужным массивом(объектом) по ID
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id) //перезаписываем в объекте отфильтрованный массив
        setTasks({...tasks}) // сетаем копию в стейт для перерисовки*/
    }
    function changeFilter(todolistId: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatchToTodolistsReducer(action) //отправляем в todolistsReducer
        /*let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value           // фильтр - это свойство,  а не метод!!!
            setTodolists([...todolists])
        }*/
    }
    function addTask(todolistId: string, title: string) {
        const action = addTaskAC( {
            todoListId: todolistId,
            id: "ef6fe64f64w",
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            order: 0, description: '', priority: 0, startDate: '',
            deadline: '',
        })
        dispatchToTasksReducer(action)
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
    function changeTasksStatus(todolistId: string, taskId: string, status:TaskStatuses) {
        const action = changeTaskStatusAC(taskId,status,todolistId)
        dispatchToTasksReducer(action)
        /*let todolistTasks = tasks[todolistId]  // новая переменная с нужным массивом(объектом) по ID
        let task = todolistTasks.find(el => el.id === taskId)
        // изменяем значение isDone таски если она нашлась
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks}) // сетаем копию объекта в стейт для перерисовки
        }*/
    }
    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        const action = changeTaskTitleAC(todolistId,taskId, newTitle)
        dispatchToTasksReducer(action)
        /*let todolistTasks = tasks[todolistId]  // новая переменная с нужным массивом(объектом) по ID
        let task = todolistTasks.find(el => el.id === taskId)
        // изменяем значение title таски если оно нашлось
        if (task) {
            task.title = newTitle
            setTasks({...tasks}) // сетаем копию объекта в стейт для перерисовки
        }*/
    }
    function onClickAddTodolist(title: string) {
        const action = addTodolistAC({
            id:v1(),
            title: title,
            addedDate: "",
            order: 0

        })
        dispatchToTodolistsReducer(action) //отправляем в todolistsReducer
        dispatchToTasksReducer(action)
        /*let newTodolistId = crypto.randomUUID()
        let newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })*/
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
                                    tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatuses.New) // сокращенно: !task.isDone -это тоже самое что и: task.isDone === false
                                }
                                if (el.filter === 'completed') {
                                    tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatuses.Completed)
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
                                            entityStatus = {el.entityStatus}
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

export default AppWithReducers;
