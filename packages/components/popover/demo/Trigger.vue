<template>
  <ix-space>
    <ix-popover title="Title" content="Content...">
      <ix-button>Hover</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." trigger="focus">
      <ix-button>Focus</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." trigger="click">
      <ix-button>Click</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." trigger="contextmenu">
      <ix-button>Context Menu</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." trigger="manual" :visible="visible">
      <ix-button @click="visible = !visible">Manual</ix-button>
    </ix-popover>
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
