import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    key: string
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (taskTitle: string, todoListID: string) => void
    addTodolist: (title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListID: string, title: string,) => void
}


export function TodoList(props: TodoListType) {


    let tasks = props.tasks.map(task => {

        const onClickHandler = () => props.removeTask(task.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }

        const changeTitle = (title: string) => {
            props.changeTaskTitle(task.title, title, props.id)
        }

        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    onChange={changeStatus}*/}
                {/*    checked={task.isDone}/>*/}
                    <Checkbox
                        onChange={changeStatus}
                        checked={task.isDone}
                        color={"primary"}
                    />

                <EditableSpan changeTitle={changeTitle} title={task.title}/>

                {/*<button onClick={onClickHandler}>X</button>*/}
                <IconButton>
                    <Delete onClick={onClickHandler} />
                </IconButton>

            </li>
        )
    })


    const removeTodoList = () => props.removeTodoList(props.id)

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }
    return (
        <div>
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} title={props.title}/>
                <IconButton>
                    <Delete onClick={removeTodoList} />
                </IconButton>
                {/*<button onClick={removeTodoList}>X</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle:"none", padding: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button variant={"contained"} size={"small"} color={props.filter === "all" ? "secondary" : "default"}
                    // className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button variant={"contained"} size={"small"} color={props.filter === "active" ? "secondary" : "default"}
                    // className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={"contained"} size={"small"} color={props.filter === "completed" ? "secondary" : "default"}
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

