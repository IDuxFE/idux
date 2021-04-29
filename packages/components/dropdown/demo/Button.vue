<template>
  <ix-space>
    <ix-dropdown-button @click="onClick">
      Dropdown
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown-button>
    <ix-dropdown-button icon="setting" @click="onClick">
      Dropdown
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown-button>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const onClick = () => console.log('button click')
    return { onClick }
  },
})
</script>
