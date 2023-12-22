<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import ContainerComponent from '@/components/ContainerComponent.vue'

import { useTaskService } from '@/composables/useTaskServices'

const {
  enableEdit,
  tasks,
  getAllTasks,
  postNewTask,
  selectedTask,
  putTask,
  deleteTask,
  taskCompleted
} = useTaskService()

getAllTasks()
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
