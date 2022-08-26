<template>
  <div ref="divRef" style="border: 1px dashed; padding: 24px"> useClickOutside </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useClickOutside } from '@idux/cdk/click-outside'

const divRef = ref()

useClickOutside(divRef, () => {
  console.log('useClickOutside callback')
})
</script>
