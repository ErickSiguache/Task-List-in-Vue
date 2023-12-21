<script setup lang="ts">
import { type Ref, ref } from 'vue'

import capitalizeString from '../utils/capitalizeString'

const props = defineProps<{
  title: string
}>()

const titlePrincipal: Ref<string> = ref(capitalizeString(props.title))
</script>

<template>
  <header>
    <h1>{{ titlePrincipal }}</h1>
  </header>
</template>

<style scoped>
h1 {
  color: var(--primary-color);
}

header {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  padding-top: 2.5rem;
  padding-bottom: 1rem;
}
</style>
