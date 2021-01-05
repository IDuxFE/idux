<template>
  <ix-space :wrap="true">
    <ix-button v-for="item in 20" :key="item">Button</ix-button>
  </ix-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IxButton, IxSpace } from '@idux/components'

export default defineComponent({
  name: 'Wrap',
  components: { IxButton, IxSpace },
})
</script>
