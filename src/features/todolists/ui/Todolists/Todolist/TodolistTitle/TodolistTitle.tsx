import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { DomainTodolist, } from "../../../../model/todolistsSlice"
import s from "./TodolistTitle.module.css"
import { todolistApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "features/todolists/api/todolistsApi"
import { useAppDispatch } from "common/hooks"
import { RequestStatus } from "app/appSlice"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()


  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistApi.util.updateQueryData('getTodolists', undefined, state => {
        const index = state.findIndex(tl => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      })
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData('loading')
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData('idle')
      })
  }
  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"}/>
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
