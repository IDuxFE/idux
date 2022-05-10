<template>
  <IxSelect
    v-model:value="value"
    searchable
    :searchFilter="false"
    placeholder="Please input search text"
    :suffix="loading ? 'loading' : undefined"
    @change="onChange"
    @search="onSearch"
  >
    <IxSelectOption v-for="option in dataSource" :key="option.login.uuid">
      {{ option.name.first }} {{ option.name.last }}
    </IxSelectOption>
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

interface RandomUser {
  gender: string
  email: string
  name: {
    first: string
    last: string
  }
  login: {
    uuid: string
  }
}

const value = ref()
const loading = ref(false)
const dataSource = ref<RandomUser[]>([])

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}

const onSearch = async (searchValue: string) => {
  console.log('onSearch', searchValue)
  loading.value = true

  const { results } = await fetch(`https://randomuser.me/api?name=${searchValue}&results=20`).then(res => res.json())

  loading.value = false
  dataSource.value = results
}
</script>
