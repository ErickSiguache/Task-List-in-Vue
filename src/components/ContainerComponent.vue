<script setup lang="ts">
import { type Task, type stateTypes } from '../interfaces/PersonInterface'
import { listTypes } from '../utils/dictionaryStatus'

defineProps<{
  tasks: Task[]
}>()

const styleCheckButton = (stateTask: stateTypes) => {
  return stateTask === listTypes.incomplete ? 'fa-regular' : 'fa-solid'
}

const styleComplete = (state: stateTypes) => {
  return state === listTypes.complete ? 'text-decoration-complete' : ''
}

defineEmits(['delete', 'changeState', 'select'])
</script>
<template>
  <main>
    <template v-if="tasks.length <= 0">
      <section>
        <h2>No hay tareas en la base de datos</h2>
      </section>
    </template>
    <template v-else>
      <article v-for="task in tasks" :key="task.id">
        <section>
          <button aria-label="check" @click="$emit('changeState', task)">
            <font-awesome-icon :icon="`${styleCheckButton(task.state)} fa-circle-check`" />
          </button>
        </section>
        <section>
          <p :class="styleComplete(task.state)">{{ task.name }}</p>
        </section>
        <section>
          <button aria-label="edit" @click="$emit('select', task)">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          </button>
          <button aria-label="delete" @click="$emit('delete', task.id)">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </section>
      </article>
    </template>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  margin: 2.5rem 1rem;
  gap: 1rem;
}

article {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--color-background-container);
  max-width: 600px;
  border-radius: 5px;
  padding: 0.2rem 2.5rem;
  border: 0.1px solid transparent;
}

article:hover {
  border: 1px solid var(--primary-color);
}

.text-decoration-complete {
  color: var(--primary-color);
  text-decoration: line-through;
}

button {
  font-size: 1.1rem;
  color: white;
  background-color: transparent;
  border: none;
  margin: 0.2rem;
  cursor: pointer;
}

button:hover {
  color: var(--primary-color);
}

@media screen and (max-width: 370px) {
  article {
    flex-direction: column;
    justify-content: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
</style>
