<template>
  <ix-button @click="showInfo">pauseOnHover</ix-button>
  <ix-button @click="showVnodeInfo">pauseOnHover False</ix-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
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
        content: 'This is a message for success, and pauseOnHover is false',
        pauseOnHover: false,
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
