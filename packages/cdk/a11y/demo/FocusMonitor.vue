<template>
  <div class="example-focus-monitor">
    <IxButton ref="element" ghost>Focus Monitored Element ({{ elementOrigin }})</IxButton>
  </div>
  <div class="example-focus-monitor">
    <div ref="subtree">
      <p>Focus Monitored Subtree ({{ subtreeOrigin }})</p>
      <IxButton ghost>Child Button 1</IxButton>
      <IxButton ghost>Child Button 2</IxButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { FocusOrigin, useSharedFocusMonitor } from '@idux/cdk/a11y'

const element = ref<HTMLElement>()
const subtree = ref<HTMLElement>()

const elementOrigin = ref<FocusOrigin>(null)
const subtreeOrigin = ref<FocusOrigin>(null)

const focusMonitor = useSharedFocusMonitor()

onMounted(() => {
  watch(focusMonitor.monitor(element), ({ origin, event }) => {
    elementOrigin.value = origin
    console.log(origin, event)
  })

  watch(focusMonitor.monitor(subtree, true), ({ origin, event }) => {
    subtreeOrigin.value = origin
    console.log(origin, event)
  })
})

onBeforeUnmount(() => {
  focusMonitor.stopMonitoring(element)
  focusMonitor.stopMonitoring(subtree)
})
</script>

<style scoped lang="less">
.example-focus-monitor {
  background-color: @color-grey;
  padding: 20px;

  .cdk-mouse-focused {
    background: @color-blue;
  }

  .cdk-keyboard-focused {
    background: @color-green;
  }

  .cdk-touch-focused {
    background: @color-magenta;
  }

  .cdk-program-focused {
    background: @color-red;
  }

  .ix-button {
    margin-right: 12px;
  }
}
</style>
