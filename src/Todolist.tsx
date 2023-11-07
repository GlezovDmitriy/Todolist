import React, {useRef, useState, KeyboardEvent, ChangeEvent, FC} from "react";
import {FullInput} from "./components/FullInput";
import {FilterValuesType} from "./App";


type PropsType = {
    todolistId:string
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (todolistId: string, value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeTasksStatus: (taskId: string, newIsDoneValue: boolean) => void,
}
export type TaskType = {
    title: string,
    id: string,
    isDone: boolean,
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
        changeTasksStatus
    }) => {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [inputError, setInputError] = useState(false)


    const onClickAddTask = () => {
        const trimmedTitle = newTaskTitle.trim()                      // убираем пробелы
        if (trimmedTitle.length !== 0) {                                      //если что-то осталось в строке - то добавляем ее
            addTask(trimmedTitle)
        } else {
            setInputError(true)                                          //если строка пустая - то передаем в локальный стейт, что есть ошибка
        }
        setNewTaskTitle(newTaskTitle = '')
    }
    const isAddBtnDisabled = newTaskTitle === '' || newTaskTitle.length >= 15
    const userMessage = inputError
    ? <span style={{color: 'red'}}> Нужно что-то ввести!</span>
        : newTaskTitle.length < 15
        ? <span> Enter new title</span>
        : <span style={{color: 'red'}}> Too long message</span>
    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" &&
        onClickAddTask()

    const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)                                                    //сбрасываем ошибку, если до этого была при вводе пробелов
        setNewTaskTitle(e.currentTarget.value)                                        // отрисовывает каждый новый символ в инпуте
    }


    return (
        <div>
            <h3>{title}</h3>
            {/*<FullInput/>*/}
            <div>
                {/* <input ref={titleInput}/>
                <button onClick={()=>{
                    if (titleInput.current !== null) {
                        props.addTask(titleInput.current.value)
                        titleInput.current.value = ''
                    }
                }}>+</button>*/}
                <input
                    className={inputError ? "input-error" : undefined}
                    value={newTaskTitle}
                    onChange={onChangeSetNewTaskTitle}
                    onKeyDown={onKeyDownAddTask}

                />

                <button
                    onClick={onClickAddTask}
                    disabled={isAddBtnDisabled}
                >+
                </button>
                <div>
                    <span>{userMessage} </span>
                </div>

            </div>
            <ul>
                {tasks.map((task, index) => {
                    const onClickRemoveTaskHandler = () => {
                        removeTask(task.id)
                    }
                    const onChangeStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) => changeTasksStatus(task.id, e.currentTarget.checked)
                    return (
                        <li key={task.id}>
                            <input
                                onChange={onChangeStatusHandler}
                                type="checkbox"
                                checked={task.isDone}/>
                            <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                            <button onClick={onClickRemoveTaskHandler}>
                                ✖️
                            </button>
                        </li>
                    )
                })}


            </ul>
            <div className={"buttons"}>
                <button
                    className={filter === 'all' ? "btn-active" : undefined}
                    onClick={() => {
                        changeFilter( todolistId, 'all')
                    }}>All
                </button>
                <button
                    className={filter === 'active' ? "btn-active" : undefined}
                    onClick={() => {
                        changeFilter(todolistId,'active')
                    }}>Active
                </button>
                <button
                    className={filter === 'completed' ? "btn-active" : undefined}
                    onClick={() => {
                        changeFilter(todolistId,'completed')
                    }}>Completed
                </button>
                <button
                    className={filter === 'delete all' ? "btn-active" : undefined}
                    onClick={() => {
                        changeFilter(todolistId,'delete all')
                    }}>Delete all
                </button>
            </div>
        </div>
    )
}