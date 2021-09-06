<template>
  <IxTable :columns="columns" :dataSource="dataSource" :rowKey="getRowKey" :pagination="pagination" :spin="loading">
    <template #name="{ value }">
      <a>{{ value }}</a>
    </template>
  </IxTable>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { TableColumn, TablePagination } from '@idux/components/table'

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

const columns: TableColumn<RandomUser>[] = [
  {
    title: 'Name',
    children: [
      {
        title: 'First Name',
        dataKey: ['name', 'first'],
      },
      {
        title: 'Last Name',
        dataKey: ['name', 'last'],
      },
    ],
  },
  {
    title: 'Gender',
    dataKey: 'gender',
  },
  {
    title: 'email',
    dataKey: 'email',
  },
]

const dataSource = ref<RandomUser[]>([])

const getRowKey = (record: RandomUser) => record.login.uuid

const pagination = reactive<TablePagination>({
  showSizeChanger: true,
  onChange: (index, size) => fetchData(index, size),
})

const loading = ref(false)

const fetchData = async (index: number, size: number) => {
  loading.value = true

  const params = { page: index, results: size }
  const { data } = await axios.get('https://randomuser.me/api', { params })

  loading.value = false

  dataSource.value = data.results

  pagination.pageIndex = index
  pagination.pageSize = size
  pagination.total = 200 // mock the total data here
}

onMounted(() => fetchData(1, 10))
</script>
