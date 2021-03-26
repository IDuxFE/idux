<template>
  <ix-button @click="MessageService.success('This is a success message')">Success</ix-button>
  <ix-button @click="MessageService.error('This is an error message')">Error</ix-button>
  <ix-button @click="MessageService.warn('This is a warn message')">Warn</ix-button>
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
