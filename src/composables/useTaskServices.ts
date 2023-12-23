import { type Ref, ref } from 'vue'

import type { Task, taskEdit } from '@/interfaces/PersonInterface'
import { stringValidator, numbersValidator, toastComponent, listTypes } from '@/utils/index'

import { getTasks, postTask } from '@/services/TaskService'

export function useTaskService() {
  const defaultEdit: taskEdit = { id: 0, name: '' }

  const enableEdit: Ref<taskEdit> = ref(defaultEdit)
  const tasks: Ref<Task[]> = ref([])

  const getAllTasks = (): void => {
    tasks.value = getTasks()
  }

  const filterTaskByName = (nameTask: string): Task[] => {
    return tasks.value.filter((task) => task.name === nameTask)
  }

  const postNewTask = (nameTask: string): void => {
    try {
      const taskNameAdd = stringValidator(nameTask)

      const newTask: Task = {
        id: tasks.value.length + 1,
        name: taskNameAdd,
        state: listTypes.incomplete
      }

      if (filterTaskByName(nameTask).length > 0) {
        toastComponent({
          alertType: 'error',
          message: 'La tarea ya existe'
        })
        return
      }

      tasks.value.push(newTask)
      postTask(tasks.value)

      toastComponent({
        alertType: 'success',
        message: 'La tarea fue guardada exitosamente'
      })
    } catch (error) {
      if (error instanceof TypeError) {
        toastComponent({
          alertType: 'error',
          message: error.message
        })
      }
    }
  }

  const selectedTask = (task: Task): void => {
    if (enableEdit.value.id === 0) {
      enableEdit.value = task
      return
    }
    enableEdit.value = defaultEdit
  }

  const putTask = (taskToEdit: taskEdit): void => {
    try {
      const taskNotRepeat = tasks.value.find((task) => {
        if (task.name === taskToEdit.name && task.id !== taskToEdit.id) {
          return task
        }
      })

      if (taskNotRepeat) {
        enableEdit.value = defaultEdit
        toastComponent({
          alertType: 'error',
          message: 'Ya existe otra tarea con el mismo nombre.'
        })
        return
      }

      tasks.value.map((task: Task) => {
        if (task.id === taskToEdit.id) {
          task.name = stringValidator(taskToEdit.name)
        }
      })

      postTask(tasks.value)
      enableEdit.value = defaultEdit
      toastComponent({
        alertType: 'success',
        message: 'La tarea a sido modificada'
      })
    } catch (error) {
      if (error instanceof TypeError) {
        toastComponent({
          alertType: 'error',
          message: error.message
        })
      }
    }
  }

  const deleteTask = (idTask: number): void => {
    try {
      numbersValidator(idTask)
      const taskNotDeleted = tasks.value.filter((task) => task.id !== idTask)
      tasks.value = [...taskNotDeleted]
      postTask(tasks.value)

      toastComponent({
        alertType: 'success',
        message: 'La tarea ha sido eliminada'
      })
    } catch (error) {
      if (error instanceof TypeError) {
        toastComponent({
          alertType: 'error',
          message: error.message
        })
      }
    }
  }

  const taskCompleted = (taskToEdit: Task): void => {
    tasks.value.map((task) => {
      if (task.id === taskToEdit.id) {
        task.state = task.state === listTypes.complete ? listTypes.incomplete : listTypes.complete
      }
    })

    postTask(tasks.value)
  }

  return {
    enableEdit,
    tasks,
    getAllTasks,
    postNewTask,
    selectedTask,
    putTask,
    deleteTask,
    taskCompleted
  }
}
