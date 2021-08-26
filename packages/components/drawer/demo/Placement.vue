<template>
  <IxRadioGroup v-model:value="placement">
    <IxRadio value="left">left</IxRadio>
    <IxRadio value="right">right</IxRadio>
    <IxRadio value="top">top</IxRadio>
    <IxRadio value="bottom">bottom</IxRadio>
  </IxRadioGroup>
  <IxButton @click="showDrawer"> Click me </IxButton>
  <IxDrawer v-model:visible="visible" title="抽屉标题" :placement="placement">
    <p>上下左右多方向打开抽屉内容</p>
    <p>上下左右多方向打开抽屉内容</p>
    <p>上下左右多方向打开抽屉内容</p>
  </IxDrawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const placement = ref('left')
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    return { placement, visible, showDrawer }
  },
})
</script>
<style lang="less" scoped></style>
