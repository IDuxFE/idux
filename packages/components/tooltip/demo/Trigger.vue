<template>
  <ix-tooltip title="prompt text">
    <ix-button>Hover</ix-button>
  </ix-tooltip>
  <ix-tooltip title="prompt text" trigger="focus">
    <ix-button>Focus</ix-button>
  </ix-tooltip>
  <ix-tooltip title="prompt text" trigger="click">
    <ix-button>Click</ix-button>
  </ix-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxButton } from '@idux/components/button'
import { IxTooltip } from '@idux/components/tooltip'

export default defineComponent({
  name: 'Trigger',
  components: { IxButton, IxTooltip },
  setup() {},
})
</script>

<style lang="less" scoped>
.ix-button {
  margin-right: 5px;
}
</style>
