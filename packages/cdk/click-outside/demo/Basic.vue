<template>
  <ix-button @click.stop="toggle">toggle</ix-button>
  <p v-if="visible" v-click-outside="toggle" @click="log">Hello world</p>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { clickOutside } from '@idux/cdk/click-outside'

export default defineComponent({
  directives: { clickOutside },
  setup() {
    const visible = ref(false)

    const toggle = () => {
      visible.value = !visible.value
    }

    const log = () => {
      console.log('hello world')
    }

    return { visible, toggle, log }
  },
})
</script>
