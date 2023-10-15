import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

/*import * as crypto from "crypto";*/


export type FilterValuesType = 'completed' | 'all' | 'active' | 'delete all'

function App() {


    const title1 = 'What to learn1';
    const title2 = 'React';

    let [tasks, setTasks] = useState([
        {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
        {id: crypto.randomUUID(), title: "JS", isDone: true},
        {id: crypto.randomUUID(), title: "ReactJS", isDone: false},
        {id: crypto.randomUUID(), title: "Git", isDone: true},
        {id: crypto.randomUUID(), title: "Figma", isDone: false},
    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }
    console.log(crypto.randomUUID())
    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone) // сокращенно: !task.isDone -это тоже самое что и: task.isDone === false
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    if (filter === 'delete all') {
        tasksForTodolist = tasks.filter(task => (!task.isDone && task.isDone))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title:string) {
const newTaskId = crypto.randomUUID()
const newTask: TaskType ={
    id: newTaskId,
    title: title,
    isDone: false
}
const nextState: Array<TaskType> = [...tasks, newTask]
        setTasks(nextState)
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
    function changeTasksStatus(taskId: string, newIsDoneValue: boolean) {
        const updateTasks:Array<TaskType> = tasks.map(t =>t.id === taskId
        ? {...t, isDone: newIsDoneValue}: t)
        setTasks(updateTasks)

    }

    return (
        <div className='App'>
            <Todolist title={title1}
                      filter = {filter}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTasksStatus={changeTasksStatus}
            />

        </div>

    );
}

export default App;
