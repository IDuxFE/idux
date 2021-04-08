<template>
  <ix-button @click="open">Customized icon name</ix-button>
  <ix-button @click="openVNode">Customized icon VNode</ix-button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { IxMessage } from '@idux/components/message'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  setup() {
    const iconName = 'star'
    const open = () => IxMessage.info('This is a star message', { icon: iconName })

    const iconVNode = h(IxIcon, { name: 'star', style: { color: 'red' } })
    const openVNode = () => IxMessage.info('This is a star message', { icon: iconVNode })

    return { open, openVNode }
  },
})
</script>

<style lang="less" scoped>
.ix-button {
  margin-right: 8px;
}
</style>
