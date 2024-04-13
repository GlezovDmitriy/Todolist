import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import React from "react";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export  default {
    title: 'Task Component',
    component: Task
}
const changeTaskTitleCallback = action('Title changed')
const changeTaskStatusCallback = action('Status changed')
const removeTaskCallback = action('remove')
export const TaskBaseExample = () =>{
    return <>
        <Task
            t={{id:'1', status: TaskStatuses.Completed, title: 'CSS',  addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistID1"}}
            changeTaskTitle={changeTaskTitleCallback}
            changeTasksStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId1'}
        />
        <Task
            t={{id:'2', title: 'JS', status: TaskStatuses.New, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistID2"}}
            changeTaskTitle={changeTaskTitleCallback}
            changeTasksStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId2'}
        />
    </>
}