import {TasksStateType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";


export type ActionType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(t => t.id !== action.taskId)
            }

        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const newTask: TaskType = {
                id: action.taskId,
                title: action.title,
                isDone: false
            }
            const tasksCopy = [newTask, ...tasks]
            stateCopy[action.todoListId] = tasksCopy
            return stateCopy
        }
        case "CHANGE-TASK-STATUS":

            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    {
                        if (task.id === action.id) {
                            return {...task, isDone: action.status}
                        }
                    }
                    return task
                })
            }
        case "CHANGE-TASK-TITLE":

            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    {
                        if (task.id === action.id) {
                            return {...task, title: action.title}
                        }
                    }
                    return task
                })
            }
        case "ADD-TODO-LIST":
            return {

            }

        default:
            throw new Error("I dont")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) =>
    ({type: "REMOVE_TASK", taskId, todoListId}) as const
export const addTaskAC = (title: string, todoListId: string) =>
    ({type: "ADD-TASK", title, todoListId, taskId: v1()}) as const
export const changeTaskStatusAC = (id: string, status: boolean, todoListId: string) =>
    ({type: "CHANGE-TASK-STATUS", id, status, todoListId}) as const
export const changeTaskTitleAC = (id: string, title: string, todoListId: string) =>
    ({type: "CHANGE-TASK-TITLE", id, title, todoListId}) as const
export const AddTodolistAC = (id: string) =>
    ({type: "ADD-TODO-LIST", id}) as const