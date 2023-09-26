import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = 'completed' | 'all' | 'active'

function App() {


    const title1 = 'What to learn1';
    const title2 = 'React';

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Git", isDone: true},
        {id: 5, title: "Figma", isDone: false},
    ])

    function removeTask(id: number) {
        let filtredTasks = tasks.filter(task => task.id !== id)
        setTasks(filtredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>('active')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className='App'>
            <Todolist title={title1}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>

    );
}

export default App;
