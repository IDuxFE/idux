<template>
  <IxSpace>
    <IxPopconfirm title="Are you sure to delete this task?" trigger="hover">
      <IxButton>Hover</IxButton>
    </IxPopconfirm>
    <IxPopconfirm title="Are you sure to delete this task?" trigger="focus">
      <IxButton>Focus</IxButton>
    </IxPopconfirm>
    <IxPopconfirm title="Are you sure to delete this task?">
      <IxButton>Click</IxButton>
    </IxPopconfirm>
    <IxPopconfirm title="Are you sure to delete this task?" trigger="contextmenu">
      <IxButton>Context Menu</IxButton>
    </IxPopconfirm>
    <IxPopconfirm
      title="Are you sure to delete this task?"
      trigger="manual"
      :visible="visible"
      @ok="changeVisible"
      @cancel="changeVisible"
    >
      <IxButton @click="changeVisible">Manual</IxButton>
    </IxPopconfirm>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const changeVisible = () => {
  visible.value = !visible.value
}
</script>
