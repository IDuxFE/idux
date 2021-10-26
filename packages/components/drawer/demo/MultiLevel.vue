<template>
  <IxButton @click="showDrawer"> Open </IxButton>
  <IxDrawer v-model:visible="visible" header="Parent drawer">
    <p>This is parent drawer</p>
    <IxButton @click="showChildDrawer">Open Child Drawer</IxButton>
    <IxDrawer v-model:visible="childVisible" header="Child drawer">
      <p>This is child drawer</p>
      <IxButton @click="showGrandchildDrawer">Open Grandchild Drawer</IxButton>
      <IxDrawer v-model:visible="grandchildVisible" header="Grandchild drawer">
        <p>This is Grandchild drawer</p>
        <p>This is Grandchild drawer</p>
        <p>This is Grandchild drawer</p>
      </IxDrawer>
    </IxDrawer>
  </IxDrawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const childVisible = ref(false)
const grandchildVisible = ref(false)

const showDrawer = () => {
  visible.value = !visible.value
}

const showChildDrawer = () => {
  childVisible.value = !childVisible.value
}

const showGrandchildDrawer = () => {
  grandchildVisible.value = !grandchildVisible.value
}
</script>
