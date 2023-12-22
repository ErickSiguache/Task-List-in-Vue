<script setup lang="ts">
import { type Ref, ref } from 'vue'

import { type Task, type taskEdit } from './interfaces/PersonInterface'
import { listTypes } from './utils/dictionaryStatus'
import { getTasks, postTask } from './services/TaskService'

import { toastComponent } from './utils/toastTypes'
import { stringValidator } from './utils/validators/stringValidators'
import { numbersValidator } from './utils/validators/numberValidators'

import FormComponent from './components/FormComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import ContainerComponent from './components/ContainerComponent.vue'

const defaultEdit: taskEdit = { id: 0, name: '' }
const enableEdit: Ref<taskEdit> = ref(defaultEdit)
const tasks: Ref<Task[]> = ref([])

const getAllTasks = (): void => {
  tasks.value = getTasks()
}
getAllTasks()

const postNewTask = (nameTask: string): void => {
  try {
    const taskNameAdd = stringValidator(nameTask)
    const newTask: Task = {
      id: tasks.value.length + 1,
      name: taskNameAdd,
      state: 'incomplete'
    }

    const taskNotRepeat = tasks.value.filter((task) => task.name === taskNameAdd)
    if (taskNotRepeat.length > 0) {
      toastComponent('error', 'La tarea ya existe')
      return
    }

    tasks.value.push(newTask)
    postTask(tasks.value)
    toastComponent('success', 'La tarea fue guardada exitosamente')
  } catch (error) {
    if (error instanceof TypeError) {
      toastComponent('error', error.message)
    }
  }
}

const selectedTask = (task: Task): void => {
  enableEdit.value = task
}

const putTask = (taskToEdit: taskEdit): void => {
  try {
    tasks.value.map((task: Task) => {
      if (task.id === taskToEdit.id) {
        task.name = stringValidator(taskToEdit.name)
      }
    })

    postTask(tasks.value)
    enableEdit.value = defaultEdit
    toastComponent('success', 'La tarea a sido modificada')
  } catch (error) {
    if (error instanceof TypeError) {
      toastComponent('error', error.message)
    }
  }
}

const deleteTask = (idTask: number): void => {
  try {
    numbersValidator(idTask)
    const taskNotDeleted = tasks.value.filter((task) => task.id !== idTask)
    tasks.value = [...taskNotDeleted]
    postTask(tasks.value)
    toastComponent('success', 'La tarea ha sido eliminada')
  } catch (error) {
    if (error instanceof TypeError) {
      toastComponent('error', error.message)
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
</script>

<template>
  <HeaderComponent title="Mi lista de tareas" />
  <FormComponent
    placeholderText="Agregar una nueva tarea"
    titleFirstButton="Crear"
    titleSecondButton="Modificar"
    :changeToEdit="enableEdit"
    @add="postNewTask"
    @edit="putTask"
  />
  <ContainerComponent
    :tasks="tasks"
    @delete="deleteTask"
    @changeState="taskCompleted"
    @select="selectedTask"
  />
</template>

<style scoped></style>
