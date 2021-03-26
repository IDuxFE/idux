<template>
  <div>
    <ix-button @click="showInfo">create a destroyable message</ix-button>

    <ix-button @click="removeLast">delete last destroyable message</ix-button>
    <ix-button @click="removeAll">delete all destroyable messages</ix-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MessageService } from '@idux/components/message'

export default defineComponent({
  setup() {
    const messages = ref<(string | number)[]>([])
    const number = ref<number>(0)

    const showInfo = () => {
      const messageIns = MessageService.info({
        content: `This is a message for handle close ${number.value}`,
        onClose(curId) {
          const currentIdx = messages.value.findIndex(id => id === curId)
          if (currentIdx !== -1) {
            messages.value.splice(currentIdx, 1)
          }
        },
      })
      messages.value.push(messageIns.messageId)
      number.value++
    }
    const removeLast = () => {
      const id = messages.value[messages.value.length - 1]
      MessageService.remove(id)
    }
    const removeAll = () => {
      MessageService.remove()
      messages.value = []
    }
    return {
      showInfo,
      removeLast,
      removeAll,
    }
  },
})
</script>
<style lang="less">
.ix-icon {
  width: 16px;
}
</style>
