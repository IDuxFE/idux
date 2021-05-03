<template>
  <ix-button @click="open">Duration 10s</ix-button>
  <ix-button @click="open2">Duration 0</ix-button>
  <ix-button @click="manuallyDestroy">Manually destroy</ix-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxMessage } from '@idux/components/message'
import { MessageItemInstance } from '../src/types'

export default defineComponent({
  setup() {
    const open = () => {
      IxMessage.info('The message will disappear in 10 seconds', { duration: 10000 })
    }

    let instance: MessageItemInstance | null = null
    const open2 = () => {
      instance = IxMessage.info(`The message is open disappear in 10 seconds`, { duration: 0 })
    }
    const manuallyDestroy = () => instance?.destroy()

    return { open, open2, manuallyDestroy }
  },
})
</script>

<style lang="less" scoped>
.ix-button {
  margin-right: 8px;
}
</style>
