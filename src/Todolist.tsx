import React, {useRef, useState, KeyboardEvent, ChangeEvent, FC} from "react";
import {FullInput} from "./components/FullInput";
import {FilterValuesType} from "./App";


type PropsType = {
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
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
        title,
        filter,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTasksStatus
    }) => {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    /*const titleInput = useRef<HTMLInputElement>(null)*/
    const onClickAddTask = () => {
        const trimmedTitle = newTaskTitle.trim()                      // убираем пробелы
        if (trimmedTitle.length !== 0) {                                      //если что-то осталось в строке - то добавляем ее
            addTask(trimmedTitle)
        }
        setNewTaskTitle(newTaskTitle = '')
    }
    const isAddBtnDisabled = newTaskTitle === '' || newTaskTitle.length >= 15
    const userMessage = newTaskTitle.length < 15
        ? <span> Enter new title</span>
        : <span style={{color: 'red'}}> Too long message</span>
    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" &&
        onClickAddTask()

    const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)
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
                <input value={newTaskTitle}
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
                        changeFilter('all')
                    }}>All
                </button>
                <button
                    className={filter === 'active' ? "btn-active" : undefined}
                    onClick={() => {
                        changeFilter('active')
                    }}>Active
                </button>
                <button
                    className={filter === 'completed' ? "btn-active" : undefined}
                    onClick={() => {
                        changeFilter('completed')
                    }}>Completed
                </button>
                <button
                    className={filter === 'delete all' ? "btn-active" : undefined}
                    onClick={() => {
                        changeFilter('delete all')
                    }}>Delete all
                </button>
            </div>
        </div>
    )
}