<template>
  <ix-button @click="info('Info message')">Info</ix-button>
  <ix-button @click="success('Success message')">Success</ix-button>
  <ix-button @click="warning('Warning message')">Warning</ix-button>
  <ix-button @click="error('Error message')">Error</ix-button>
  <ix-button @click="loading('Loading message')">Loading</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const { info, success, warning, error, loading } = IxMessage
    return { info, success, warning, error, loading }
  },
})
</script>

<style lang="less" scoped>
.ix-button {
  margin-right: 8px;
}
</style>
