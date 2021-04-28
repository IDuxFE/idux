<template>
  <div v-show="visible" class="ix-option-group">
    <span class="ix-option-group-label">
      <slot name="label">{{ label }}</slot>
    </span>
  </div>
  <ix-option v-for="o in options" :key="o.value" :disabled="o.disabled" :label="o.label" :value="o.value" />
  <slot v-if="!options.length" />
</template>
<script lang="ts">
import { computed, defineComponent, inject, nextTick, onUnmounted, provide, ref, watch } from 'vue'
import IxOption from './Option.vue'
import { optionGroupPropsDef } from './types'
import { visibleChangeToken } from './utils'

export default defineComponent({
  name: 'IxOptionGroup',
  components: { IxOption },
  props: optionGroupPropsDef,
  setup() {
    const showItemCount = ref(0)
    const visible = computed(() => showItemCount.value > 0)

    const visibleChange = (visible: boolean) => {
      if (visible) {
        showItemCount.value++
      } else {
        showItemCount.value--
      }
    }
    provide(visibleChangeToken, visibleChange)

    const parentVisibleChange = inject(visibleChangeToken)
    watch(visible, value => nextTick(() => parentVisibleChange?.(value)), { immediate: visible.value })
    onUnmounted(() => {
      if (visible.value) {
        parentVisibleChange?.(false)
      }
    })

    return { visible }
  },
})
</script>
