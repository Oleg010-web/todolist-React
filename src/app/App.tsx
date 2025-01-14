import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import React, { useEffect, useState } from "react"
import { selectThemeMode } from "./appSelectors"
import { Outlet } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import s from './App.module.css'
import { useMeQuery } from "features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { setIsLoggedIn } from "./appSlice"

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()
  // const isInitialized = useAppSelector(selectIsInitialized)

  
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  if(!isInitialized){
    return <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Outlet/>
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
