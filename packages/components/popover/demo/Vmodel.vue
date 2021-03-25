<template>
  <div>
    <ix-popover v-model:visible="visible" title="Title" content="Content">
      <span>Tooltip will show when it's click.</span>
    </ix-popover>
    <ix-button @click.stop="toggle">toggle</ix-button>
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, ref } from 'vue'
import { IxPopover, IxButton } from '@idux/components'

export default defineComponent({
  name: 'VModel',
  components: { IxButton, IxPopover },
  setup() {
    const visible = ref(true)

    const toggle = () => {
      visible.value = !visible.value
    }

    const change = (e: ComputedRef<boolean>) => {
      visible.value = e.value
    }

    return { visible, toggle, change }
  },
})
</script>
