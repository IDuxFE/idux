<template>
  <IxRadioGroup v-model:value="placement">
    <IxRadio value="top">top</IxRadio>
    <IxRadio value="end">end</IxRadio>
    <IxRadio value="bottom">bottom</IxRadio>
    <IxRadio value="start">start</IxRadio>
  </IxRadioGroup>
  <IxButton @click="showDrawer"> Open </IxButton>
  <IxDrawer v-model:visible="visible" header="Basic Drawer" :placement="placement">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </IxDrawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const placement = ref('end')

const visible = ref(false)

const showDrawer = () => {
  visible.value = !visible.value
}
</script>
