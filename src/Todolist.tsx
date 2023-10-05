import React, {useRef, useState, KeyboardEvent, ChangeEvent} from "react";
import {FullInput} from "./components/FullInput";
import {FilterValuesType} from "./App";


type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
}
export type TaskType = {
    title: string,
    id: string,
    isDone: boolean,
}

export const Todolist = (props: PropsType) => {
    console.log('render')
    let [newTaskTitle, setNewTaskTitle] = useState('')
    /*const titleInput = useRef<HTMLInputElement>(null)*/
    const onClickAddTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle(newTaskTitle = '')
    }
    const isAddBtnDisabled = newTaskTitle === '' || newTaskTitle.length >= 15
    const userMessage = newTaskTitle.length < 15
        ? <span> Enter new title</span>
        : <span style={{color:'red'}} > Too long message</span>
const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => event.key ==="Enter" &&
    onClickAddTask()

 const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)
    return (
        <div>
            <h3>{props.title}</h3>
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
                {props.tasks.map((task, index) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {
                                props.removeTask(task.id)
                            }}>
                                ✖️
                            </button>
                        </li>
                    )
                })}


            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
                <button onClick={() => {
                    props.changeFilter('delete all')
                }}>Delete all
                </button>
            </div>
        </div>
    )
}