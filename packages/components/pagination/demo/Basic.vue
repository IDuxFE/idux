<template>
  <IxSpace vertical block>
    <IxPagination :total="500" />
    <IxPagination :pageIndex="pageIndex" disabled :total="500" />
    <IxPagination v-model:pageIndex="pageIndex" :total="500" />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageIndex = ref(6)
</script>
