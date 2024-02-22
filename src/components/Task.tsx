import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

export type TaskPropsType = {
    t: TaskType,
    removeTask: (todolistId: string, id: string) => void,
    changeTasksStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void,
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    todolistId: string
}
export const Task = React.memo(
    (props: TaskPropsType) => {
        const onClickRemoveTaskHandler = useCallback(
            () => {
                props.removeTask(props.todolistId, props.t.id)
            },[]
        )
        const onChangeStatusHandler = useCallback(
            (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTasksStatus(props.todolistId, props.t.id, e.currentTarget.checked),[]
        )

        const onChangeTitleHandler = useCallback(
            (newValue: string) => {
                props.changeTaskTitle(props.todolistId, props.t.id, newValue)
            },[props.changeTaskTitle,props.todolistId,props.t.id]
        )

        return (
            <div key={props.t.id} className={props.t.isDone ? "task-done" : "task"}>
                {/*<input
                                onChange={onChangeStatusHandler}
                                type="checkbox"
                                checked={task.isDone}/>*/}
                <Checkbox color='primary'
                          onChange={onChangeStatusHandler}
                          checked={props.t.isDone}
                />
                <EditableSpan title={props.t.title} onChange={onChangeTitleHandler}/>
                {/*<button className={"tasks-btn"} onClick={onClickRemoveTaskHandler}>
                                X️
                            </button>*/}
                <IconButton onClick={onClickRemoveTaskHandler}
                    /*style={{
                        maxWidth: '20px', maxHeight: '20px',
                        minWidth: '20px', minHeight: '20px',
                        marginLeft: '5px'
                    }}*/>
                    <Delete/>
                </IconButton>
            </div>
        )
    }
)