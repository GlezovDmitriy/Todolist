import React, {useRef, useState, KeyboardEvent, ChangeEvent, FC} from "react";
import {FullInput} from "./components/FullInput";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton, TextField, Grid} from "@mui/material";
import {AddBox, Delete} from "@mui/icons-material";


export type PropsType = {
    todolistId: string
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTask: (todolistId: string, id: string) => void,
    changeFilter: (todolistId: string, value: FilterValuesType) => void,
    addTask: (todolistId: string, title: string) => void,
    changeTasksStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void,
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}
export type TaskType = {
    title: string,
    id: string,
    isDone: boolean,
}

function DeleteIcon() {
    return null;
}

export const Todolist: FC<PropsType> = (
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
    const onChangeTodolistTitle = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
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
                {tasks.map((task, index) => {
                    const onClickRemoveTaskHandler = () => {
                        removeTask(todolistId, task.id)
                    }
                    const onChangeStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) => changeTasksStatus(todolistId, task.id, e.currentTarget.checked)
                    const onChangeTitleHandler = (newValue: string) => {
                        changeTaskTitle(todolistId, task.id, newValue)
                    }

                    return (
                        <div key={task.id} className={task.isDone ? "task-done" : "task"}>
                            {/*<input
                                onChange={onChangeStatusHandler}
                                type="checkbox"
                                checked={task.isDone}/>*/}
                            <Checkbox color='primary'
                                      onChange={onChangeStatusHandler}
                                      checked={task.isDone}
                            />
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                            {/*<button className={"tasks-btn"} onClick={onClickRemoveTaskHandler}>
                                X️
                            </button>*/}
                            <IconButton onClick={onClickRemoveTaskHandler}
                                /*style={{
                                    maxWidth: '20px', maxHeight: '20px',
                                    minWidth: '20px', minHeight: '20px',
                                    marginLeft: '5px'
                                }}*/>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}


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
                {/* <Button
                    variant={filter === 'delete all' ? "outlined" : 'text'}
                    style={{
                        fontSize: '10px', fontWeight: 'bold',
                        marginLeft: '5px'
                    }}
                    onClick={() => {
                        changeFilter(todolistId, 'delete all')
                    }}>Delete all
                </Button>*/}
            </div>
        </div>
    )
}