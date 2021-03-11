<template>
  <ix-button @click="showInfo">Customized content</ix-button>
  <ix-button @click="showVnodeInfo">Customized content vnode</ix-button>
</template>
<script lang="ts">
import { defineComponent, h } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    const showInfo = () => {
      MessageService.success({
        content: 'This is a message for success, and content is change',
      })
    }
    const showVnodeInfo = () => {
      MessageService.success({
        content: h('ul', {}, [
          h('li', {}, 'This is a vnode content data'),
          h('li', {}, 'This is a vnode content data'),
        ]),
      })
    }
    return {
      showInfo,
      showVnodeInfo,
    }
  },
})
</script>
<style lang="less">
.ix-icon {
  width: 16px;
}
</style>
