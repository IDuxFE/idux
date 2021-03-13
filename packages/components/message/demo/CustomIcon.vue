<template>
  <ix-button @click="showInfo">Customized icon name</ix-button>
  <ix-button @click="showVnodeInfo">Customized icon vnode</ix-button>
</template>
<script lang="ts">
import { defineComponent, h } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    const showInfo = () => {
      MessageService.success({
        content: 'This is a message for success, and icon is change',
        icon: 'close-circle-filled',
      })
    }
    const showVnodeInfo = () => {
      MessageService.success({
        content: 'This is a message for success, and icon is change',
        icon: h('img', {
          src: 'https://cdn.jsdelivr.net/gh/danranvm/image-hosting/images/idux.jpg',
          class: 'ix-icon',
        }),
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
