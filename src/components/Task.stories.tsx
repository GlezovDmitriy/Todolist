import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';
import {AddItemForm} from "./AddItemForm";
import React from "react";

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
            t={{id:'1', isDone:true, title: 'CSS'}}
            changeTaskTitle={changeTaskTitleCallback}
            changeTasksStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId1'}
        />
        <Task
            t={{id:'2', isDone:false, title: 'JS'}}
            changeTaskTitle={changeTaskTitleCallback}
            changeTasksStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId2'}
        />
    </>
}