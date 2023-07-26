<template>
  <IxInput v-model:value="searchParams.searchValue" style="width: 200px; margin-bottom: 8px"></IxInput>
  <h4>Virtual scrolling + scroll loading, load data by listening to the scrolledBottom event.</h4>
  <IxTable
    ref="virtualTableRef"
    virtual
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false"
    :scroll="scroll"
    :spin="spinning"
    @scrolled-bottom="onLoadMore"
  ></IxTable>

  <h4>Scroll loading, load data by listening to the scroll event.</h4>
  <IxTable
    ref="normalTableRef"
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false"
    :scroll="scroll"
    :spin="spinning"
    @scroll="onNormalTableScroll"
  ></IxTable>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import { debounce, isEmpty } from 'lodash-es'

import { TableColumn, TableInstance } from '@idux/components/table'

interface Data {
  key: number
  name: string
  age: number
  address: string
}

interface ResponseData {
  data: Data[]
  total: number
}

interface SearchParams {
  pageIndex: number
  pageSize: number
  searchValue: string
}

const columns: TableColumn<Data>[] = [
  {
    title: 'Name',
    dataKey: 'name',
    customCell: 'name',
  },
  {
    title: 'Age',
    dataKey: 'age',
  },
  {
    title: 'Address',
    dataKey: 'address',
  },
]

const scroll = { height: 200 }

/** Enumeration of loading states. */
enum MORE_STATUS_ENUM {
  more,
  noMore,
  loading,
}

const loadStatus = ref(MORE_STATUS_ENUM.more)
const spinning = computed(() => loadStatus.value === MORE_STATUS_ENUM.loading)
const currentPage = ref(0)
const dataSource = ref<Data[]>([])
const virtualTableRef = ref<TableInstance>()

/** Reset the data source for table initialization loading and search condition changes. */
const onResetLoad = () => {
  currentPage.value = 0
  loadData(currentPage.value, {
    succFn: (data: Data[]) => {
      dataSource.value = data ?? []
    },
    failedFn: () => {
      dataSource.value = []
    },
  })
}

/**
 * Load more data for scroll loading.
 * When virtual scrolling is enabled, you can directly call this method by listening to the scrolledBottom event.
 * When virtual scrolling is disabled, you need to listen to the scroll event of the table, judge whether it has reached the bottom, and then call this method to implement it. See onNormalTableScroll for details
 */
const onLoadMore = debounce(
  () => {
    if ([MORE_STATUS_ENUM.noMore, MORE_STATUS_ENUM.loading].includes(loadStatus.value)) {
      return
    }
    currentPage.value++
    loadData(currentPage.value, {
      succFn: (data: Data[]) => {
        if (isEmpty(data)) {
          dataSource.value = []
        } else {
          dataSource.value.push(...data)
        }
      },
    })
  },
  300,
  {
    leading: true,
  },
)

const loadData = debounce(
  async (
    pageIndex: number,
    options?: {
      succFn?: (data: Data[]) => void
      failedFn?: () => void
    },
  ) => {
    loadStatus.value = MORE_STATUS_ENUM.loading
    const responseData = await loadDataFunc(pageIndex)

    const { succFn, failedFn } = options ?? {}

    if (isEmpty(responseData.data)) {
      loadStatus.value = MORE_STATUS_ENUM.noMore
      failedFn?.()
    }

    loadStatus.value = isMoreFunc(responseData) ? MORE_STATUS_ENUM.more : MORE_STATUS_ENUM.noMore

    succFn?.(responseData.data)
  },
  300,
  {
    leading: true,
  },
)

const searchParams = ref<SearchParams>({
  pageIndex: 0,
  pageSize: 20,
  searchValue: '',
})

/** Method for loading data. */
const loadDataFunc = async (pageIndex: number) => {
  searchParams.value.pageIndex = pageIndex
  return await getData(searchParams.value)
}

/** Callback to determine if there is more data. */
const isMoreFunc = (responseData: ResponseData) => {
  return responseData.total > searchParams.value.pageSize * (searchParams.value.pageIndex + 1)
}

const MockData: Data[] = new Array(1000).fill(0).map((item, index) => ({
  name: `name${index}`,
  address: `address${index}`,
  age: index + 1,
  key: index,
}))

const getData = (params: SearchParams) => {
  return new Promise<ResponseData>(resolve => {
    setTimeout(() => {
      const { searchValue, pageIndex, pageSize } = params
      const start = pageIndex * pageSize
      const end = start + pageSize
      const filterDate = MockData.filter(item =>
        item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )
      resolve({
        data: filterDate.slice(start, end),
        total: filterDate.length,
      })
    }, 1000)
  })
}

watch(
  () => searchParams.value.searchValue,
  () => {
    onResetLoad()
    virtualTableRef.value?.scrollTo(0)
  },
  { immediate: true },
)

/** Scroll loading without virtual scrolling --start-- */
const normalTableRef = ref<TableInstance>()

/** Listen to the scroll event of the table without virtual scrolling. */
const onNormalTableScroll = (e: Event) => {
  const target = e.target
  if (target instanceof HTMLDivElement) {
    const scrollPosition = target.scrollTop + target.clientHeight
    const totalHeight = target.scrollHeight
    if (scrollPosition >= totalHeight) {
      onLoadMore()
    }
  }
}

watch(
  () => searchParams.value.searchValue,
  () => {
    onResetLoad()
    normalTableRef.value?.scrollTo(0)
  },
  { immediate: true },
)
/** Scroll loading without virtual scrolling --end-- */
</script>
