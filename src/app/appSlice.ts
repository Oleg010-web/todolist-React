import { createSlice, isPending } from "@reduxjs/toolkit"
import { tasksApi } from "features/todolists/api/tasksApi"
import { todolistApi } from "features/todolists/api/todolistsApi"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type Error = string | null



export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as Error,
    isLoggedIn: false,
  },
  reducers: create => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus}>((state, action)=>{
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
  extraReducers: builder => {
    builder.addMatcher(
      isPending,
      state => {
        state.status = 'loading'
      }
    )
    .addMatcher(
      action => {
        return action.type.endsWith('/fulfilled')
      },
      state => {
        state.status = 'succeeded'
      }
    )
    .addMatcher(
      action => {
        return action.type.endsWith('/rejected')
      },
      state => {
        state.status = 'failed'
      }
    )
    .addMatcher(
      isPending,
      (state, action) => {
        if (
          todolistApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = 'loading'
      }
    )
  }
})


export const { changeTheme, setAppError, setAppStatus, setIsLoggedIn  } = appSlice.actions
export const { selectIsLoggedIn  } = appSlice.selectors
export const appReducer = appSlice.reducer
