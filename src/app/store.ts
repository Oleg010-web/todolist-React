import {  UnknownAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { todolistSlice, todolistsReducer } from "../features/todolists/model/todolistsSlice"
import { appReducer, appSlice } from "./appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"



export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // 1
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
 
// 2
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>


