<template>
  <input :value="valueRef" @input="onInput" @blur="onBlur" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useValueAccessor } from '@idux/cdk/forms'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'control'],
  emits: ['update:value'],
  setup() {
    const { accessor } = useValueAccessor()

    const valueRef = computed(() => accessor.valueRef.value)

    const onInput = (evt: Event) => accessor.setValue((evt.target as HTMLInputElement).value)

    const onBlur = () => accessor.markAsBlurred()

    return { valueRef, onInput, onBlur }
  },
})
</script>
