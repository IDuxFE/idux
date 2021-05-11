<template>
  <ix-space>
    <ix-dropdown>
      Hover me
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
    <ix-divider type="vertical" />
    <ix-dropdown trigger="click">
      Click me
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
    <ix-divider type="vertical" />
    <ix-dropdown trigger="contextmenu">
      Right click me
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
  </ix-space>
  <br /><br />
  <ix-dropdown :visible="visible" trigger="manual">
    <ix-switch v-model:checked="visible"></ix-switch>
    <template #overlay>
      <ix-menu>
        <ix-menu-item> Item 1 </ix-menu-item>
        <ix-menu-item> Item 2 </ix-menu-item>
        <ix-menu-divider />
        <ix-menu-item disabled> Item 3 </ix-menu-item>
      </ix-menu>
    </template>
  </ix-dropdown>
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
