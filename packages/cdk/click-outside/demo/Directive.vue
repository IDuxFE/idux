<template>
  <div ref="containerRef" style="border: 1px dashed; padding: 24px">
    <IxSpace>
      <IxButton ref="oneButtonRef" v-clickOutside="one">First</IxButton>
      <IxButton v-clickOutside="two">Two</IxButton>
    </IxSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useMessage } from '@idux/components/message'

const containerRef = ref()
const oneButtonRef = ref()

const { info } = useMessage()
const one = () => info("You clicked somewhere, but it's not the first button")
const two = {
  handler: () => info("You clicked somewhere in the container, but it's not the first or second button"),
  container: containerRef,
  exclude: [oneButtonRef],
}
</script>
