import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {Task} from "./components/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
}


export const TodoList = React.memo((props: PropsType) => {

    let tasks = props.tasks

    if (props.filter === "active") {
        tasks = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = props.tasks.filter(t => t.isDone === true);
    }

    console.log("render todoList")

    const dispatch = useDispatch()

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }, [dispatch])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id));
    }, [props.id, dispatch])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.id));
    }, [dispatch, props.id])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title));
    }, [props.id, dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch])

    const onAllClickHandler = () => changeFilter("all", props.id)
    const onActiveClickHandler = () => changeFilter("active", props.id)
    const onCompletedClickHandler = () => changeFilter("completed", props.id)

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => <Task task={t} idTodoList={props.id} title={t.title} isDone={t.isDone} key={t.id}
                                     changeStatus={changeStatus}
                                     removeTask={removeTask}
                                     changeTaskTitle={changeTaskTitle}
                />)

            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


