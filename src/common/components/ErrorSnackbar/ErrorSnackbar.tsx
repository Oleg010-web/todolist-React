import Alert from "@mui/material/Alert"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from "common/hooks"
import React, { SyntheticEvent } from "react"
import { setAppError } from "../../../app/appSlice"
import { selectError } from "../../../app/appSelectors"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)

  const dispatch = useAppDispatch()

  const handleClose = (event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppError({error: null}))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
