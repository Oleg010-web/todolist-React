import { AddItemForm } from "common/components"
import { DomainTodolist } from "../../../model/todolistsSlice"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useAddTaskMutation } from "features/todolists/api/tasksApi"


type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [ addTask ] = useAddTaskMutation()

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId: todolist.id })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
