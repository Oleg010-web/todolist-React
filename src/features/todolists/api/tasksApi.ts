import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse,  UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "app/baseApi"

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({ 
    getTasks: build.query< GetTasksResponse, { todolistId: string; args: { page: number }}>({
      query: ({todolistId, args}) => {
        const params = { ...args, count: PAGE_SIZE }
        return {
          url: `todo-lists/${todolistId}/tasks`,
          params
        }
      },
      transformResponse(tasks: GetTasksResponse): GetTasksResponse {
        return {
          ...tasks,
          items: tasks.items.map(tl => ({...tl, entityStatus: 'idle' }))
        }
      },
      providesTags: (res, err, { todolistId }) =>
        res
          ? [
              ...res.items.map(({ id }) => ({ type: 'Task', id }) as const),
              { type: 'Task', id: todolistId },
            ]
          : ['Task'],
    }),
    addTask: build.mutation<BaseResponse<DomainTask>, {todolistId: string; title: string,}>({
      query: ({todolistId, title})=>{
        return {
          url: `todo-lists/${todolistId}/tasks`,
          method: 'POST',
          body:  {title} ,
        }
      },
      invalidatesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, {todolistId: string; taskId: string; model: UpdateTaskModel}>({
      query: ({todolistId, taskId, model})=> {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: 'PUT',
          body: model
        }
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: 'Task', id: taskId }],
    })
  })
})

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

// export const _tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
//   },
//   createTask(payload: { title: string; todolistId: string }) {
//     const { title, todolistId } = payload
//     return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
//   },
//   deleteTask(payload: { todolistId: string; taskId: string }) {
//     const { taskId, todolistId } = payload
//     return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
//   },
//   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { taskId, todolistId, model } = payload
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
// }
