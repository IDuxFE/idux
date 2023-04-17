<template>
  <IxTabs :dataSource="dataSource" type="line">
    <template #content="{ key }"> Content of Tab {{ key }} </template>
  </IxTabs>
</template>

<script setup lang="ts">
const dataSource = Array.from({ length: 3 }).map((_, index) => {
  return { key: index, title: `Tab ${index}` }
})
</script>
