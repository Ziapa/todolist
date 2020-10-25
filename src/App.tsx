import React, {useState} from 'react';
import './App.scss';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // const [tasks, setTasks] = useState<Array<TaskType>>(
    //     [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //         {id: v1(), title: "SCSS", isDone: true}
    //     ]);

    const todoList1 = v1()
    const todoList2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: "What to learn", filter: "all"},
        {id: todoList2, title: "What to buy", filter: "active"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoList2]: [
            {id: v1(), title: "Bear", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Milk", isDone: false}
        ]
    })


    // function changeTaskStatus(taskID: string, isDone: boolean,todoListID: string ) {
    //     const todoList = tasks[todoListID]
    //     let task = todoList.find(task => task.id === taskID)
    //     if (task) {
    //         task.isDone = isDone;
    //         setTasks({...tasks})
    //     }
    // }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoList = tasks[todoListID]
        const newTodoList = todoList.map(task => {
            if (task.id === taskID) {
                return {...task, isDone: isDone}
            }
            return task
        })
        tasks[todoListID] = newTodoList
        setTasks({...tasks})
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoList = tasks[todoListID]
        const newTodoList = todoList.map(task => {
            if (task.id === taskID) {
                return {...task, title: title}
            }
            return task
        })
        tasks[todoListID] = newTodoList
        setTasks({...tasks})
    }
 function changeTodoListTitle(todoListID: string, title: string,) {
       const todoList = todoLists.find(tl => tl.id === todoListID)
     if (todoList) {
         todoList.title = title
         setTodoLists([...todoLists])
     }
    }


    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const todoList = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoList]
        setTasks({...tasks})
    }


    function removeTask(taskId: string, todoListID: string) {
        const todoList = tasks[todoListID]
        tasks[todoListID] = todoList.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        // setTasks({...tasks})
    }


    function addTodolist(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, filter: "all", title: title}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todoLists.map(tl => {

                    let taskForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        taskForTodoList = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }
                    return (
                        <TodoList
                            id={tl.id}
                            key={tl.id}
                            title={tl.title}
                            addTask={addTask}
                            filter={tl.filter}
                            tasks={taskForTodoList}
                            removeTask={removeTask}
                            addTodolist={addTodolist}
                            changeFilter={changeFilter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    )
}

export default App;
