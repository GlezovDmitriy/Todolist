import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

/*import * as crypto from "crypto";*/


export type FilterValuesType = 'completed' | 'all' | 'active' | 'delete all'
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todolistID1 = crypto.randomUUID()
    let todolistID2 = crypto.randomUUID()


    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )

    //const title1 = 'What to learn1';
    //const title2 = 'React';

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
            {id: crypto.randomUUID(), title: "JS", isDone: true},
            {id: crypto.randomUUID(), title: "ReactJS", isDone: false},
        ],
        [todolistID2]: [
            {id: crypto.randomUUID(), title: " book HTML&CSS", isDone: true},
            {id: crypto.randomUUID(), title: " book JS", isDone: true},
            {id: crypto.randomUUID(), title: " book ReactJS", isDone: false},
            {id: crypto.randomUUID(), title: " book Git", isDone: true},
            {id: crypto.randomUUID(), title: " book Figma", isDone: false},
        ]
    })

    function removeTask(todolistId: string, id: string) {
        let todolistTasks = tasks[todolistId]  // новая переменная с нужным массивом(объектом) по ID
        tasks[todolistId] = todolistTasks.filter(task => task.id !== todolistId) //перезаписываем в объекте отфильтрованный массив
        setTasks({...tasks}) // сетаем копию в стейт для перерисовки
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value           // фильтр - это свойство,  а не метод!!!
            setTodolists([...todolists])
        }

    }

    function addTask(todolistId: string, title: string) {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title: title,
            isDone: false
        }
        let todolistTasks = tasks[todolistId]  // новая переменная с нужным массивом(объектом) по ID
        tasks[todolistId] = [newTask,...todolistTasks]  // перезапись массива с добавлением новой таски в начало
        setTasks({...tasks})            // сетаем копию в стейт для перерисовки
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
    function changeTasksStatus(todolistId: string, taskId: string, newIsDoneValue: boolean) {
        let todolistTasks = tasks[todolistId]  // новая переменная с нужным массивом(объектом) по ID
        let task = todolistTasks.find(el => el.id === taskId)
        // изменяем значение isDone таски если она нашлась
        if (task){
            task.isDone = newIsDoneValue
        }
        setTasks({...tasks}) // сетаем копию объекта в стейт для перерисовки

    }

    return (
        <div className='App'>
            {
                todolists.map(el => {
                    let tasksForTodolist = tasks // копия  массива тасок
                    if (el.filter === 'active') {
                        tasksForTodolist = tasks.filter(task => !task.isDone) // сокращенно: !task.isDone -это тоже самое что и: task.isDone === false
                    }
                    if (el.filter === 'completed') {
                        tasksForTodolist = tasks.filter(task => task.isDone)
                    }
                    if (el.filter === 'delete all') {
                        tasksForTodolist = tasks.filter(task => (!task.isDone && task.isDone))
                    }
                    return <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        filter={el.filter}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTasksStatus={changeTasksStatus}
                    />

                })
            }


        </div>

    );
}

export default App;
