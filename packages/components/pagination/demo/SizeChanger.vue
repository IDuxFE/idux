<template>
  <IxPagination showSizeChanger :total="500" />
  <br />
  <IxPagination v-model:pageSize="pageSize" :pageSizes="[10, 20, 30, 40]" showSizeChanger :total="500" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageSize = ref(20)
</script>
