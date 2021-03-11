<template>
  <ix-button @click="MessageService.info('This is a normal message')">Display normal message</ix-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    return {
      MessageService,
    }
  },
})
</script>
<style lang="less" scoped></style>
