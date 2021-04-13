import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todolist-reducer";

let reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

type ReducerType = typeof reducers
export  type AppStateType = ReturnType<ReducerType>

export let store = createStore(reducers)


// @ts-ignore
window.store = store

