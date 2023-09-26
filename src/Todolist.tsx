import React from "react";
import {FullInput} from "./components/FullInput";
import {FilterValuesType} from "./App";


type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask:(taskId:number)=>void,
    changeFilter: (value:FilterValuesType)=>void,
}
type TaskType = {
    title: string,
    id: number,
    isDone: boolean,
}

export const Todolist = (props: PropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <FullInput/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task, index)=>{
                    return(
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>{
                                props.removeTask(task.id)}}>
                                ✖️</button>
                        </li>
                    )
                })}



            </ul>
            <div>
                <button onClick={()=>{
                    props.changeFilter('all')
                }}>All</button>
                <button onClick={()=>{
                    props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{
                    props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}