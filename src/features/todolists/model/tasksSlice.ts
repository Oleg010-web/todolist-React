import { ResultCode } from "common/enums"
import { handleNetworkError, handleServerError } from "common/utils"
import { Dispatch } from "redux"
import { RequestStatus, setAppStatus } from "../../../app/appSlice"
import { RootState } from "../../../app/store"
//import { _tasksApi } from "../api/tasksApi"
import { DomainTask, NewDomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { addTodolist, removeTodolist } from "./todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"


export type TasksStateType = {
  [key: string]: NewDomainTask[] 
}


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: create => ({
    setTasks: create.reducer<{ todolistId: string; tasks: NewDomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const task = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
      if(task !== -1){
        state[action.payload.todolistId].splice(task, 1)
      }
    }),
    addTask: create.reducer<{ task: NewDomainTask }>((state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }>((state, action) => {
       const tasks = state[action.payload.todolistId]
       const taskIndex = tasks.findIndex(t => t.id === action.payload.taskId)
       if(taskIndex !== -1){
        tasks[taskIndex] = {...tasks[taskIndex], ...action.payload.domainModel}
       }
    }),
    changeTaskEntityStatus: create.reducer<{taskId: string; todolistId: string, entityStatus: RequestStatus}>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const taskIndex = tasks.findIndex(t => t.id === action.payload.taskId)
      if(taskIndex !== -1) {
        tasks[taskIndex].entityStatus = action.payload.entityStatus
      }
    }),
    clearTasks: create.reducer(() => {
      return {}
    })
  }),
  extraReducers: builder => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  }
})

 export const {setTasks, removeTask, addTask, updateTask, changeTaskEntityStatus, clearTasks} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer



// // //Thunks
// export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: 'loading'}))
//   _tasksApi.getTasks(todolistId).then((res) => {
//     dispatch(setAppStatus({status: 'succeeded'}))
//     const tasks = res.data.items
//     dispatch(setTasks({ todolistId, tasks }))
//   })
// }

// export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: 'loading'}))
//   dispatch(changeTaskEntityStatus({...arg, entityStatus: 'loading'}))
//   _tasksApi.deleteTask(arg).then((res) => {
//     dispatch(setAppStatus({status: 'succeeded'}))
//     dispatch(removeTask(arg))
//   })
//   .catch(()=> {
//     dispatch(changeTaskEntityStatus({...arg, entityStatus: 'failed'}))
//   })
// }

// export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: 'loading'}))
//   _tasksApi
//     .createTask(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({status: 'succeeded'}))
//         dispatch(addTask({ task: res.data.data.item }))
//       } else {
//         handleServerError<{ item: DomainTask }>(dispatch, res.data)
//       }
//     })
//     .catch((err) => {
//       handleNetworkError(dispatch, err)
//     })
// }

// export const updateTaskTC =
//   (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
//   (dispatch: Dispatch, getState: () => RootState) => {
//     const { taskId, todolistId, domainModel } = arg

//     const allTasksFromState = getState().tasks
//     const tasksForCurrentTodolist = allTasksFromState[todolistId]
//     const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

//     if (task) {
//       const model: UpdateTaskModel = {
//         status: task.status,
//         title: task.title,
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         ...domainModel,
//       }

//       dispatch(setAppStatus({status: 'loading'}))
//       _tasksApi
//         .updateTask({ taskId, todolistId, model })
//         .then((res) => {
//           if (res.data.resultCode === ResultCode.Success) {
//             dispatch(updateTask(arg))
//             dispatch(setAppStatus({status: 'succeeded'}))
//           } else {
//             handleServerError(dispatch, res.data)
//           }
//         })
//         .catch((err) => {
//           handleNetworkError(dispatch, err)
//         })
//     }
//   }


