import React, { useEffect, useState } from 'react'
import axios from "axios";

export default {
    title: 'API',
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": 'bc698716-52a0-4948-9063-299272c3de30'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((responsive)=>{
                setState(responsive.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title:"Dima"}, settings)
            .then((responsive)=>{
                setState(responsive.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/cb813a8d-05a8-4753-ab13-2051b80cc62e', settings)
            .then((responsive)=>{
                setState(responsive.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a3ce01c3-2ed7-43ff-b6f9-8520943b4b4d'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title: "IVAN-IVAN"}, settings)
            .then((responsive)=>{
                setState(responsive.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}