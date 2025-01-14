import { instance } from "common/instance";
import { Inputs } from "../ui/login/Login";
import { LoginArgs } from "./authApi.types";
import { BaseResponse } from "common/types";
import { baseApi } from "app/baseApi";

export const authApi = baseApi.injectEndpoints({ 
  endpoints: build => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => 'auth/me'
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: payload => ({
        url: 'auth/login',
        method: 'POST',
        body: payload
      })
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => {
        return {
          method: 'DELETE',
          url: 'auth/login',
        }
      }
    })
  })
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi

export const _authApi = {
  login(payload: Inputs) {
    //const {title, todolistId} = payload
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseResponse>('auth/login')
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>('auth/me')
  },
}