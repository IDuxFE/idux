<template>
  <IxPagination :total="50" />
  <br />
  <IxPagination :pageIndex="pageIndex" disabled :total="500" />
  <br />
  <IxPagination v-model:pageIndex="pageIndex" :total="500" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageIndex = ref(6)
</script>
