<template>
  <ix-tooltip v-model:visible="visible" title="prompt text" trigger="click">
    <span>Tooltip will show when it's click.</span>
  </ix-tooltip>
  <ix-button @click.stop="toggle">toggle</ix-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IxButton } from '@idux/components/button'
import { IxTooltip } from '@idux/components/tooltip'

export default defineComponent({
  name: 'Memo',
  components: { IxTooltip, IxButton },
  setup() {
    const visible = ref(false)

    const toggle = () => {
      visible.value = !visible.value
    }

    return { visible, toggle }
  },
})
</script>
