import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange:(newValue:string)=>void
}

export const EditableSpan = React.memo(
    (props: EditableSpanType) => {
        console.log('EditableSpan')
        const [editMode, setEditMode] = useState(false)
        const [title, setTitle] = useState(props.title)
        console.log(title)
        const onDoubleClickHandler = () => {
            setEditMode(true)
        }
        const onChangeHandler= (event:ChangeEvent<HTMLInputElement>)=>{
            setTitle(event.currentTarget.value)
            props.onChange(event.currentTarget.value)
        }
        const activateViewMode=()=>{
            setEditMode(false)
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
                    : <span onDoubleClick={onDoubleClickHandler}>{title}</span>}
            </div>
        );
    }
) ;

