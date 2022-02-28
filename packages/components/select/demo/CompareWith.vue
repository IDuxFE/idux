<template>
  <IxSelect v-model:value="value" :compareFn="compareFn" @change="onChange">
    <IxSelectOption v-for="option in dataSource" :key="option.id" :label="option.name" :value="option" />
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: number
  name: string
}

const dataSource: User[] = [
  { id: 1, name: 'Tom' },
  { id: 2, name: 'Jerry' },
  { id: 3, name: 'Speike' },
]

const value = ref({ id: 1 })

const compareFn = (o1: User, o2: User) => (o1 && o2 ? o1.id === o2.id : o1 === o2)

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>
