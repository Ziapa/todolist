import React, {ChangeEvent, useCallback} from "react";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import { EditableSpan } from "../EditableSpan";

type TaskType = {
    task: {
        id: string
    }
    idTodoList: string
    isDone: boolean
    title: string
    removeTask: (idTask: string, idTodoList: string) => void
    changeStatus: (idTask: string,newIsDoneValue: boolean , idTodoList: string) => void
    changeTaskTitle: (idTask: string,newValue: string , idTodoList: string) => void
}

export const Task = React.memo ((props: TaskType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.idTodoList)
    const onChangeHandler =  (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneValue, props.idTodoList);
    }
    const onTitleChangeHandler = useCallback ( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.idTodoList);
    },[props])

    return <div key={props.task.id} className={props.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

} )