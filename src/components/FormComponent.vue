<script setup lang="ts">
import { type taskEdit } from '../interfaces/PersonInterface'
import { type Ref, ref, watch } from 'vue'

const inputText: Ref<string> = ref('')

const emits = defineEmits(['add', 'edit'])

const props = defineProps<{
  placeholderText: string
  titleFirstButton: string
  titleSecondButton: string
  changeToEdit: taskEdit
}>()

const clearInput = (): void => {
  inputText.value = ''
}

const handleAdd = (): void => {
  emits('add', inputText.value)
  clearInput()
}

const handleEdit = (): void => {
  const dataEdit = {
    id: props.changeToEdit.id,
    name: inputText.value
  }
  emits('edit', dataEdit)
  clearInput()
}

watch(
  () => props.changeToEdit,
  () => {
    inputText.value = props.changeToEdit.name
  }
)
</script>
<template>
  <section>
    <input type="text" name="task" :placeholder="placeholderText" v-model="inputText" />
    <button v-if="!changeToEdit.name" @click="handleAdd">
      {{ titleFirstButton }}
    </button>
    <button v-else @click="handleEdit">{{ titleSecondButton }}</button>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

input {
  color: var(--color-text);
  padding: 1rem;
  background-color: var(--color-button);
  border: none;
  border-radius: 5px;
  min-width: 20%;
}

input::placeholder {
  color: var(--color-text);
}

input:focus {
  outline: var(--primary-color) solid 1px;
}

button {
  color: var(--color-background);
  background-color: var(--primary-color);
  font-weight: bold;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: var(--hover-color);
}

button:active {
  background-color: var(--primary-color);
}
</style>
