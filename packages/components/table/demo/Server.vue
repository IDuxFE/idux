<template>
  <IxTable :columns="columns" :dataSource="dataSource" :getKey="getKey" :pagination="pagination" :spin="loading">
  </IxTable>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

import { TableColumn, TablePagination } from '@idux/components/table'

const setPagination = (pageIndex: number, pageSize: number) => {
  // 如果修改了 pageSize, 应该把 pageIndex 重置为 1
  if (pagination.pageSize !== pageSize) {
    pagination.pageIndex = 1
    pagination.pageSize = pageSize
  } else {
    pagination.pageIndex = pageIndex
  }

  fetchData(pagination.pageIndex, pagination.pageSize)
}

const pagination = reactive<TablePagination>({
  showSizeChanger: true,
  onChange: setPagination,
})

const loading = ref(false)

const fetchData = async (pageIndex: number, pageSize: number) => {
  loading.value = true

  const { results } = await fetch(`https://randomuser.me/api?page=${pageIndex}&results=${pageSize}`).then(res =>
    res.json(),
  )

  dataSource.value = results
  pagination.total = 200 // mock the total data here

  loading.value = false
}

onMounted(() => setPagination(1, 10))

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
    type: 'selectable',
    align: 'center',
    multiple: true,
    showIndex: false,
    onChange: console.log,
  },
  {
    key: 'Name',
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

const getKey = (record: RandomUser) => record.login.uuid
</script>
