import React from 'react';
import '../../App.css';
import {Todolist} from "../../Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Container, Grid, LinearProgress, Paper} from "@mui/material";
import {AppBarFC} from "../AppBarFC";
import {useAppWithRedux} from "./hooks/useAppWithRedux";
import {TaskType} from "../../api/todolists-api";

/*export type FilterValuesType = 'completed' | 'all' | 'active' | 'delete all'*/
/*export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}*/
export type TasksStateType = {
    [key: string]: Array<TaskType>

}

function MenuIcon() {
    return null;
}

function AppWithRedux() {
    console.log("App")
    const {
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
    } = useAppWithRedux()

    return (
        <>
            <div className='App'>
                {/*<Box sx={{ flexGrow: 1 }}>*/}
                <AppBarFC/>
                {status === 'loading' && <LinearProgress/>}
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
