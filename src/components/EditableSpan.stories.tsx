import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';
import {AddItemForm} from "./AddItemForm";
import React from "react";
import {EditableSpan} from "./EditableSpan";

export  default {
    title: 'EditableSpan Component',
    component: EditableSpan
}
const onChangeTodolistTitleCallback = action('Title changed')

export const EditableSpanBaseExample = () =>{
    return <>
        <EditableSpan title={'title'}
                      onChange={onChangeTodolistTitleCallback}/>
    </>
}