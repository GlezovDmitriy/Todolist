import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange:(newValue:string)=>void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const onDoubleClickHandler = () => {
        setEditMode(true)
    }
    const onChangeHandler= (event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
        props.onChange(event.currentTarget.value)
    }
    const activateViewMode=()=>{
        debugger
        setEditMode(false)
        console.log(props.title)
    }
    return (
        <div style={{marginTop: '10px'}}>
            {editMode
                ? /*<input
                         value={title}
                         autoFocus
                         onBlur={activateViewMode}
                         onChange={onChangeHandler}/>*/
                <TextField id="outlined-basic"
                    //label="Outlined"
                           variant="outlined"
                           value={title}
                           autoFocus
                           onBlur={activateViewMode}
                           onChange={onChangeHandler}
                />
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>}
        </div>
    );
};

