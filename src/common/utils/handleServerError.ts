import { BaseResponse } from "common/types"
import { setAppError, setAppStatus } from "../../app/appSlice"
import { AppDispatch } from "../../app/store"

export const handleServerError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
  dispatch(setAppStatus({status: 'failed'}))
  dispatch(setAppError(data.messages.length ? {error: data.messages[0]} : {error: "Some error occurred."}))
}
