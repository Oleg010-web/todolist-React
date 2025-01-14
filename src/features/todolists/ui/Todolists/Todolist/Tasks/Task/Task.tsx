import { EditableSpan } from "common/components"
import { TaskStatus } from "common/enums"
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { DomainTodolist } from "../../../../../model/todolistsSlice"
import { getListItemSx } from "./Task.styles"
import { ChangeEvent } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "features/todolists/api/tasksApi"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const [deleteTask]  = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    deleteTask({ taskId: task.id, todolistId: todolist.id })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      status: status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitleHandler = (title: string) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
 
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)} disabled={todolist.entityStatus === 'loading'}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} disabled={task.entityStatus === 'loading'}/>
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={task.entityStatus === 'loading'}/>
      </div>
      <IconButton onClick={removeTaskHandler} disabled={task.entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
