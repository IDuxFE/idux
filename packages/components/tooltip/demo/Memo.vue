<template>
  <ix-tooltip destroy-on-hide title="prompt text">
    <span>Tooltip will show when it's hovered.</span>
  </ix-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxTooltip } from '@idux/components/tooltip'

export default defineComponent({
  name: 'Memo',
  components: { IxTooltip },
})
</script>
