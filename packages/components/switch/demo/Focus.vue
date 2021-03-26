<template>
  <ix-switch ref="focusSwitchRef"></ix-switch>
  <ix-button class="mt-5" @click="focus">获得焦点</ix-button>
  <ix-button class="mt-5" @click="blur">失去焦点</ix-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const focusSwitchRef = ref<HTMLElement | null>(null)

    const focus = () => focusSwitchRef.value?.focus()

    const blur = () => focusSwitchRef.value?.blur()

    return { focusSwitchRef, focus, blur }
  },
})
</script>
<style lang="less" scoped>
.mt-5 {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}
</style>
