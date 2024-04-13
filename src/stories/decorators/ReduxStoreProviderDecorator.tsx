import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import { tasksReducer } from '../../state/task-reducer';
import {todolistsReducer} from "../../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order:0, addedDate:''},
        {id: "todolistId2", title: "What to buy", filter: "all", order:0, addedDate:''}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistID1"},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistID1"}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistID2"},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, addedDate:'',
                order:0, description:'', priority:TaskPriorities.Low, startDate:'',
                deadline:'',todoListId:"todolistID2"}
        ]
    }
};

// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}