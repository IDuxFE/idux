<template>
  <IxButton @click="showDrawer"> Click me </IxButton>
  <IxDrawer v-model:visible="visible" :on-close="onClose">
    <p>没有标题的抽屉内容</p>
    <p>没有标题的抽屉内容</p>
    <p>没有标题的抽屉内容</p>
  </IxDrawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useModal } from '@idux/components/modal'

export default defineComponent({
  setup() {
    const { confirm } = useModal()
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    const onClose = () => {
      return new Promise((resolve, reject) => {
        confirm({
          title: '温馨提示',
          content: '你确认关闭抽屉吗？',
          onOk() {
            resolve(true)
          },
          onCancel() {
            reject(false)
          },
        })
      })
    }
    return { visible, showDrawer, onClose }
  },
})
</script>
<style lang="less" scoped></style>
