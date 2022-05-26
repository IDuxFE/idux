<template>
  <IxPagination
    :pageIndex="pageIndex"
    :pageSize="pageSize"
    :pageSizes="[10, 20, 40, 80, 160]"
    showSizeChanger
    :total="500"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageIndex = ref(1)
const pageSize = ref(20)

const onChange = (index: number, size: number) => {
  pageIndex.value = index + 1
  pageSize.value = size
}
</script>
