<template>
  <IxSpace size="lg" vertical>
    <IxTabs :dataSource="dataSource" type="segment">
      <template #content="{ key }"> Content of Tab {{ key }} </template>
    </IxTabs>
    <IxTabs :dataSource="dataSource" type="segment" mode="primary">
      <template #content="{ key }"> Content of Tab {{ key }} </template>
    </IxTabs>
  </IxSpace>
</template>

<script setup lang="ts">
const dataSource = Array.from({ length: 3 }).map((_, index) => {
  return { key: index, title: `Tab ${index}` }
})
</script>
