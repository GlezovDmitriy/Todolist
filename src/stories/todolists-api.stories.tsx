import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodoLists()
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodoLists("VERON")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a3ce01c3-2ed7-43ff-b6f9-8520943b4b4d'
        todolistsApi.removeTodoLists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c4a72709-e8c0-4250-8792-a226ede08263'
        const title = 'HTML'
        todolistsApi.updateTodoLists(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
///////////////////////// TASKS////////////////////////////
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    /*useEffect(() => {
        const todolistId = 'c4a72709-e8c0-4250-8792-a226ede08263'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])*/
    const getTasks = ()=>{
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}> GET TASKS</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const deleteTasks = ()=>{
        const todolistId = 'c4a72709-e8c0-4250-8792-a226ede08263'
        const taskId = ''
        todolistsApi.deleteTasks(todolistId, taskId )
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTasks}> DELETE TASK</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskTitle, setTaskTitle] = useState<any>('')
    const createTask = ()=>{
        todolistsApi.createTask(todolistId, taskTitle )
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'newTaskTitle'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}> CREATE TASK</button>
        </div>
    </div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [description, setDescription] = useState<string>('description 1')
    //const [completed, setCompleted] = useState<any>(false)
    const [title, setTitle] = useState<string>('title 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const updateTask = ()=>{
        todolistsApi.updateTask(todolistId, taskId, {
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            title: title,
            status: status,
            //completed: completed,
        } )
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) =>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) =>{setTaskId(e.currentTarget.value)}}/>
            <input placeholder={'description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={'newTaskTitle'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={'status'} value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'} value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <input placeholder={'startDate'} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
            <input placeholder={'deadline'} value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>
            <button onClick={updateTask}> UPDATE TASK</button>
        </div>
    </div>
}
