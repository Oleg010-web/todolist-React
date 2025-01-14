import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import React from "react"
import { changeTheme, selectIsLoggedIn, setAppStatus, setIsLoggedIn } from "../../../app/appSlice"
import { selectStatus, selectThemeMode } from "../../../app/appSelectors"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { MenuButton } from "common/components"
import { useLogoutMutation } from "features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { clearTodolists } from "features/todolists/model/todolistsSlice"
import { clearTasks } from "features/todolists/model/tasksSlice"
import { baseApi } from "app/baseApi"

export const Header = () => {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectStatus)
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggin = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)
  const [logout] = useLogoutMutation()

  const changeModeHandler = () => {
    dispatch(changeTheme(themeMode === "light" ? {themeMode: "dark"}  : {themeMode: "light"}))
  }

  const logoutHandler = () => {
    logout().then(res => {
      if (res.data?.resultCode === ResultCode.Success) {
      localStorage.removeItem('sn-token')
      dispatch(setAppStatus({status: "succeeded"}))
      dispatch(setIsLoggedIn({isLoggedIn: false}))
      dispatch(baseApi.util.resetApiState())
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          {isLoggin && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
