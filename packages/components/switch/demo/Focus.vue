<template>
  <ix-switch ref="focusSwitchRef" @focus="onFocus" @blur="onBlur"></ix-switch>
  <ix-button class="mt-5 flex-cloumn" @click="focus">点击以获得焦点</ix-button>
  <ix-button class="mt-5 flex-cloumn" @click="blur">点击以失去焦点</ix-button>
  <div class="mt-5">
    <span>自动获得焦点：</span>
    <ix-switch v-model:checked="checked" autofocus></ix-switch>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const focusSwitchRef = ref<HTMLElement | null>(null)

    const focus = () => focusSwitchRef.value?.focus()

    const blur = () => focusSwitchRef.value?.blur()

    const checked = ref(false)

    const onFocus = (evt: FocusEvent) => {
      console.log(evt, '获得焦点')
    }

    const onBlur = (evt: FocusEvent) => {
      console.log(evt, '失去焦点')
    }

    return { focusSwitchRef, focus, blur, checked, onFocus, onBlur }
  },
})
</script>
<style lang="less" scoped>
.flex-cloumn {
  display: flex;
  flex-direction: column;
}
.mt-5 {
  margin-top: 5px;
}
</style>
