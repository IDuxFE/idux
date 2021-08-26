<template>
  <IxButton @click="showDrawer"> Click me </IxButton>
  <IxDrawer v-model:visible="visible" title="抽屉标题">
    <p>抽屉内容</p>
  </IxDrawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    return { visible, showDrawer }
  },
})
</script>
<style lang="less" scoped></style>
