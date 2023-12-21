import { type Task } from '../interfaces/PersonInterface'
import { getItems, postItems } from '../utils/localstorageConsult'

const LOCALSTORAGE_NAME = 'list:task'

export function getTasks(): Task[] | [] {
  const tasks = getItems<Task>(LOCALSTORAGE_NAME)
  return tasks ? tasks : []
}

export function postTask(task: Task[]) {
  postItems<Task>(LOCALSTORAGE_NAME, task)
}
