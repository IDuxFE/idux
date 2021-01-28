<template>
  <input :value="valueAccessor.value" @input="onInput" @blur="onBlur" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useValueAccessor } from '@idux/cdk/forms'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'control'],
  emits: ['update:value'],
  setup() {
    const valueAccessor = useValueAccessor()
    const onInput = (evt: Event) => {
      valueAccessor.setValue?.((evt.target as HTMLInputElement).value)
    }
    const onBlur = () => {
      valueAccessor.markAsBlurred?.()
    }
    return { valueAccessor, onInput, onBlur }
  },
})
</script>
