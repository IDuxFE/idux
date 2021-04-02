<template>
  <ix-button @click="open">Don't destroy on hover</ix-button>
  <ix-button @click="open2">Destroy on hover</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxMessage } from '@idux/components/message'

export default defineComponent({
  setup() {
    const open = () => IxMessage.info("Don't destroy on hover")
    const open2 = () => IxMessage.info('Destroy on hover', { destroyOnHover: true })

    return { open, open2 }
  },
})
</script>

<style lang="less" scoped>
.ix-button {
  margin-right: 8px;
}
</style>
