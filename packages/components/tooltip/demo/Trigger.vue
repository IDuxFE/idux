<template>
  <ix-space>
    <ix-tooltip title="prompt text">
      <ix-button>Hover</ix-button>
    </ix-tooltip>
    <ix-tooltip title="prompt text" trigger="focus">
      <ix-button>Focus</ix-button>
    </ix-tooltip>
    <ix-tooltip title="prompt text" trigger="click">
      <ix-button>Click</ix-button>
    </ix-tooltip>
    <ix-tooltip title="prompt text" trigger="contextmenu">
      <ix-button>Context Menu</ix-button>
    </ix-tooltip>
    <ix-tooltip title="prompt text" trigger="manual" :visible="visible">
      <ix-button @click="visible = !visible">Manual</ix-button>
    </ix-tooltip>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    return { visible }
  },
})
</script>
