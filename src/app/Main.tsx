import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import React from "react"
import { AddItemForm } from "common/components"
import {  useAppSelector } from "common/hooks"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { Navigate } from "react-router-dom"
import { Path } from "common/router/Router"
import { useAddTodolistMutation } from "features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const [ addTodolist] = useAddTodolistMutation()
  const isLoggin = useAppSelector(selectIsLoggedIn)
  const addTodolistCallBack = (title: string) => {
    addTodolist(title)
  }

  if(!isLoggin){
    return <Navigate to={Path.Login}/>
  }
  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolistCallBack} />
      </Grid>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
