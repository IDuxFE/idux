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
  setInterval(() => {
    if (elementOrigin.value) {
      focusMonitor.blurVia(element.value)
    } else {
      focusMonitor.focusVia(element.value, 'program')
    }
  }, 3000)

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
  background-color: #a3a3a3;
  padding: 20px;

  .cdk-mouse-focused {
    background: #1c6eff;
  }

  .cdk-keyboard-focused {
    background: #39c317;
  }

  .cdk-touch-focused {
    background: #d619be;
  }

  .cdk-program-focused {
    background: #f52727;
  }

  .ix-button {
    margin-right: 12px;
  }
}
</style>
