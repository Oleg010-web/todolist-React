import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { changeTodolistFilter, DomainTodolist } from "../../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import { useGetTasksQuery } from "features/todolists/api/tasksApi"
import { useDispatch } from "react-redux"
import { TasksSkeleton } from "features/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton"
import { useState } from "react"
import { TasksPagination } from "../TasksPagination/TasksPagination"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState(1)
  const {data, isLoading} = useGetTasksQuery({
    todolistId: todolist.id,
    args: { page },
  })
  const dispatch = useDispatch()


  if (isLoading) {
    return <TasksSkeleton />
  }

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
      <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
    </>
  )
}
