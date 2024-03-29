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
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c4a72709-e8c0-4250-8792-a226ede08263'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}

    </div>
}