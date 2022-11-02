<template>
  <IxSpace vertical block>
    <IxPagination showSizeChanger :total="500" />

    <IxPagination v-model:pageSize="pageSize" :pageSizes="[10, 20, 30, 40]" showSizeChanger :total="500" />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageSize = ref(20)
</script>
