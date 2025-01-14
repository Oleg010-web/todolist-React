import { Todolist } from '../api/todolistsApi.types';
import { RequestStatus } from "../../../app/appSlice"
//import { _todolistsApi } from "../api/todolistsApi"
import { createSlice, current } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}


export const todolistSlice = createSlice({
  name: 'todolist',
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state
  },
  reducers: create => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const todolist = state.findIndex(tl => tl.id === action.payload.id)
      if(todolist !== -1) state.splice(todolist, 1)
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      }
      state.unshift(newTodolist)
    }),
    changeTodolistTitle: create.reducer<{ id: string, title: string }>((state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id)
      if(todolist){
        todolist.title = action.payload.title
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string, entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id)
      if(todolist){
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string, filter: FilterValuesType }>((state, action) => {
      console.log(current(state))
      let todolistIndex = state.findIndex(tl => tl.id === action.payload.id)
      if(todolistIndex !== -1){
        state[todolistIndex].filter = action.payload.filter
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      action.payload.todolists.forEach(tl => {
        state.push({...tl, filter: "all", entityStatus: "idle"})
      })
    }),
    clearTodolists: create.reducer((state, action) => {
      return []
    })
  })
}) 

export const {removeTodolist, addTodolist, changeTodolistTitle, changeTodolistEntityStatus, setTodolists, clearTodolists, changeTodolistFilter} = todolistSlice.actions
export const {selectTodolists} = todolistSlice.selectors
export const todolistsReducer = todolistSlice.reducer



// Thunks
// export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({status: 'loading'}))
//   _todolistsApi.getTodolists()
//   .then((res) => {
//     dispatch(setAppStatus({status: 'succeeded'}))
//     dispatch(setTodolists({todolists: res.data}))
//     return res.data
//   })
//   .then(todos => {
//     todos.forEach(t => {
//       dispatch(fetchTasksTC(t.id))
//     })
//   })
// }

// export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({status: 'loading'}))
//   _todolistsApi
//     .createTodolist(title)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({status: 'succeeded'}))
//       dispatch(addTodolist({todolist: res.data.data.item}))
//       } else {
//         handleServerError(dispatch, res.data)
//       }
//     })
//     .catch((err) => {
//       handleNetworkError(dispatch, err)
//     })
// }

// export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({status: 'loading'}))
//   dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
//   _todolistsApi
//     .deleteTodolist(id)
//     .then(() => {
//       dispatch(setAppStatus({status: 'succeeded'}))
//       dispatch(removeTodolist({id}))
//     })
//     .catch((err) => {
//       dispatch(changeTodolistEntityStatus({ id, entityStatus: "idle" }))
//       handleNetworkError(dispatch, err)
//     })
// }

// export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({status: 'loading'}))
//   _todolistsApi.updateTodolist(arg).then((res) => {
//     dispatch(changeTodolistTitle(arg))
//   }).finally(() => {
//     dispatch(setAppStatus({status: 'idle'}))
//   })
// }


