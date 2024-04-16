import React, {ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useState} from "react";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox, Delete} from "@mui/icons-material";
import {Task} from "./components/Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {fetchTodolistsTC, FilterValuesType} from "./state/todolists-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/task-reducer";


/*export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}*/
export type PropsType = {
    todolistId: string
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTask: (todolistId: string, id: string) => void,
    changeFilter: (todolistId: string, value: FilterValuesType) => void,
    addTask: (todolistId: string, title: string) => void,
    changeTasksStatus: (todolistId: string, taskId: string, status:TaskStatuses) => void,
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}


function DeleteIcon() {
    return null;
}

export const Todolist: FC<PropsType> = React.memo(
    (
        {
            todolistId,
            title,                                                      // если так указывать, то не нужно прописывать "props." в коде
            filter,
            tasks,
            removeTask,
            changeFilter,
            addTask,
            changeTasksStatus,
            removeTodolist,
            changeTaskTitle,
            changeTodolistTitle,
        }) => {
        console.log("Todolist")
        const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
        useEffect(() => {
            dispatch(fetchTasksTC(todolistId))// из tl-reducer
        }, []);

        let [newTaskTitle, setNewTaskTitle] = useState('')
        let [inputError, setInputError] = useState(false)

        /* const addTask = (title:string)=>{
             addTask(title)
         }*/

        const onClickAddTask = () => {
            const trimmedTitle = newTaskTitle.trim()                      // убираем пробелы
            if (trimmedTitle.length !== 0) {                                      //если что-то осталось в строке - то добавляем ее
                addTask(todolistId, trimmedTitle)
            } else {
                setInputError(true)                                          //если строка пустая - то передаем в локальный стейт, что есть ошибка
            }
            setNewTaskTitle(newTaskTitle = '')
        }
        const isAddBtnDisabled = newTaskTitle.length >= 15
        const userMessage = inputError
            ? <span style={{color: 'red'}}> Please, enter something!</span>
            : newTaskTitle.length < 15
                ? <span> Enter new title</span>
                : <span style={{color: 'red'}}> Too long message!</span>
        const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" &&
            onClickAddTask()

        const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
            inputError && setInputError(false)                                                    //сбрасываем ошибку, если до этого была при вводе пробелов
            setNewTaskTitle(e.currentTarget.value)                                        // отрисовывает каждый новый символ в инпуте
        }
        const onChangeTodolistTitle = useCallback(
            (newTitle: string) => {
                changeTodolistTitle(todolistId, newTitle)
            }, [todolistId, changeTodolistTitle]
        )
        let tasksForTodolist = tasks
        if (filter === 'active') {
            tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.New) // сокращенно: !task.isDone -это тоже самое что и: task.isDone === false
        }
        if (filter === 'completed') {
            tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
        }
        return (
            <div>
                <h3 style={{display: 'flex'}}><EditableSpan title={title}
                                                            onChange={onChangeTodolistTitle}/>
                    {/*<button className={"todolist-btn"}
                           onClick={()=>removeTodolist(todolistId)}>X</button>*/}
                    <IconButton onClick={() => removeTodolist(todolistId)}
                                style={{marginTop: '3px'}}>
                        <Delete/>
                    </IconButton>
                </h3>
                {/*<FullInput/>*/}
                <div>
                    {/* <input ref={titleInput}/>
                <button onClick={()=>{
                    if (titleInput.current !== null) {
                        props.addTask(titleInput.current.value)
                        titleInput.current.value = ''
                    }
                }}>+</button>*/}
                    {/*<input
                    className={inputError ? "input-error" : undefined}
                    value={newTaskTitle}
                    onChange={onChangeSetNewTaskTitle}
                    onKeyDown={onKeyDownAddTask}

                />*/}
                    <TextField //id="outlined-basic"
                        label="Title"
                        error={!!inputError}
                        variant="outlined"
                        value={newTaskTitle}
                        onChange={onChangeSetNewTaskTitle}
                        onKeyDown={onKeyDownAddTask}
                        helperText={inputError}
                    />

                    {/*<button
                    onClick={onClickAddTask}
                    disabled={isAddBtnDisabled}
                >+
                </button>*/}

                    <IconButton //variant="contained"
                        color='primary'
                        onClick={onClickAddTask}
                        disabled={isAddBtnDisabled}>
                        <AddBox/>
                    </IconButton>
                    <div>
                        <span>{userMessage} </span>
                    </div>

                </div>
                <div className={"tasks"}>
                    {tasksForTodolist.map(task => <Task
                        t={task}
                        changeTaskTitle={changeTaskTitle}
                        changeTasksStatus={changeTasksStatus}
                        removeTask={removeTask}
                        todolistId={todolistId}
                        key={task.id}
                    />)}


                </div>
                <div className={"buttons"}>
                    <Button
                        variant={filter === 'all' ? "outlined" : 'text'}
                        onClick={() => {
                            changeFilter(todolistId, 'all')
                        }}
                        //color='primary'
                        style={{
                            fontSize: '12px', fontWeight: 'bold'
                        }}
                    >All
                    </Button>

                    <Button
                        variant={filter === 'active' ? "outlined" : 'text'}
                        style={{
                            fontSize: '12px', fontWeight: 'bold'
                        }}
                        onClick={() => {
                            changeFilter(todolistId, 'active')
                        }}>Active
                    </Button>
                    <Button
                        variant={filter === 'completed' ? "outlined" : 'text'}
                        style={{
                            fontSize: '12px', fontWeight: 'bold'
                        }}
                        onClick={() => {
                            changeFilter(todolistId, 'completed')
                        }}>Completed
                    </Button>
                </div>
            </div>
        )
    },
)


