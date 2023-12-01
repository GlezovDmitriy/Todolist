import React from 'react';

type EditableSpanType ={
    value: string
}
export const EditableSpan = (props:EditableSpanType) => {
    return (
        <div>
            <span >{props.value}</span>
        </div>
    );
};

