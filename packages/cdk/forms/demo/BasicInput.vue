<template>
  <input :value="control$.valueRef.value" @input="onChange" @blur="control$.markAsBlurred()" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectControl } from '@idux/cdk/forms'

export default defineComponent({
  props: ['control'],
  setup(props) {
    const control$ = injectControl(props.control)!

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (evt: any) => {
      control$.setValue(evt.target!.value, { dirty: true })
    }

    return { control$, onChange }
  },
})
</script>
