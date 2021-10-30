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
    <IxSelectOption v-for="option in options" :key="option.login.uuid" :value="option.email">
      {{ option.name.first }} {{ option.name.last }}
    </IxSelectOption>
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import axios from 'axios'

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
const options = ref<RandomUser[]>([])

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}

const onSearch = async (searchValue: string) => {
  console.log('onSearch', searchValue)
  loading.value = true

  const params = { name: searchValue, results: 20 }
  const { data } = await axios.get('https://randomuser.me/api', { params })

  loading.value = false
  options.value = data.results
}
</script>

<style scoped lang="less">
:deep(.ix-select) {
  width: 200px;
}
</style>
