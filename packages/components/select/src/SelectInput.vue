<template>
  <div class="ix-select-input" :style="{ width: inputWidth }">
    <input
      ref="inputRef"
      class="ix-select-input-inner"
      :value="value"
      autocomplete="off"
      :autofocus="autofocus"
      :disabled="disabled"
      :style="{ opacity: showInput ? null : 0 }"
      @input="onInput"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <span v-if="showMirror" ref="mirrorRef" class="ix-select-input-mirror" aria-hidden="true"></span>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxSelectInput',
  props: {
    value: PropTypes.any,
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    open: PropTypes.bool,
    showInput: PropTypes.bool,
    showMirror: PropTypes.bool,
  },
  emits: ['compositionstart', 'compositionend', 'input', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputWidth = ref('')
    const inputRef = ref(null as unknown as HTMLInputElement)
    const mirrorRef = ref(null as unknown as HTMLInputElement)

    const syncMirrorWidth = () => {
      if (props.showMirror) {
        const inputElement = inputRef.value
        const mirrorElement = mirrorRef.value
        // don't remove the space char, this is placeholder.
        mirrorElement.innerText = ` ${inputElement.value}`
        inputWidth.value = `${mirrorElement.scrollWidth}px`
      }
    }

    const isComposing = ref(false)
    const onCompositionStart = (evt: CompositionEvent) => {
      isComposing.value = true
      emit('compositionstart', evt)
    }
    const onCompositionEnd = (evt: CompositionEvent) => {
      if (isComposing.value) {
        isComposing.value = false
        onInput(evt)
      }
      emit('compositionend', evt)
    }
    const onInput = (evt: Event) => {
      emit('input', evt)
      if (isComposing.value) {
        return
      }
      const { value } = evt.target as HTMLInputElement
      emit('change', value)
      syncMirrorWidth()
    }

    // todo FocusOptions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const focus = (options?: any) => {
      inputRef.value.focus(options)
    }

    const blur = () => {
      inputRef.value.blur()
    }

    const clear = () => {
      const inputElement = inputRef.value
      inputElement.value = ''
      emit('change', '')

      syncMirrorWidth()
    }

    onMounted(() => {
      watch(
        () => props.open,
        value => value && focus(),
        { immediate: true },
      )

      syncMirrorWidth()
    })

    return { inputWidth, inputRef, mirrorRef, onCompositionStart, onCompositionEnd, onInput, focus, blur, clear }
  },
})
</script>
