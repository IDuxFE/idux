<template>
  <span
    :class="[
      'ix-input',
      {
        'ix-input-with-addon-after': addonAfter || $slots.addonAfter,
        'ix-input-with-addon-before': addonBefore || $slots.addonBefore,
      },
      classes,
      $attrs.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="addonBefore || $slots.addonBefore" class="ix-input-addon">
      <slot name="addonBefore">{{ addonBefore }}</slot>
    </span>
    <span class="ix-input-wrapper">
      <span v-if="prefix || $slots.prefix" class="ix-input-prefix">
        <slot name="prefix"><ix-icon :name="prefix" /></slot>
      </span>
      <input
        ref="inputRef"
        v-bind="attrs"
        class="ix-input-inner"
        :disabled="disabled$$"
        :readonly="readonly"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span v-if="isClearable" class="ix-input-suffix">
        <ix-icon :class="{ 'ix-input-clear-icon-hidden': clearHidden }" name="close-circle" @click="onClearClick" />
      </span>
      <span v-if="suffix || $slots.suffix" class="ix-input-suffix">
        <slot name="suffix"><ix-icon :name="suffix" /></slot>
      </span>
    </span>
    <span v-if="addonAfter || $slots.addonAfter" class="ix-input-addon">
      <slot name="addonAfter">{{ addonAfter }}</slot>
    </span>
  </span>
</template>

<script lang="ts">
import type { ComputedRef, Ref } from 'vue'
import type { InputConfig } from '@idux/components/config'
import type { InputProps } from './types'

import { computed, defineComponent, ref } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useAttrs } from '@idux/components/utils'
import { IxIcon } from '@idux/components/icon'
import { inputProps } from './types'
import { useCommonBindings } from './useCommonBindings'

export default defineComponent({
  name: 'IxInput',
  components: { IxIcon },
  inheritAttrs: false,
  props: inputProps,
  setup(props) {
    const attrs = useAttrs()
    const inputConfig = useGlobalConfig('input')
    const inputRef = ref(null as unknown as HTMLInputElement)

    const {
      disabled: disabled$$,
      focus,
      blur,
      onCompositionStart,
      onCompositionEnd,
      onInput,
      onFocus,
      onBlur,
      onClearClick,
      isClearable,
      clearHidden,
      isFocused,
    } = useCommonBindings(props, inputConfig, inputRef)

    const classes = useClasses(props, inputConfig, isFocused, disabled$$)

    return {
      disabled$$,
      focus,
      blur,
      attrs,
      inputRef,
      classes,
      onCompositionStart,
      onCompositionEnd,
      onInput,
      onFocus,
      onBlur,
      onClearClick,
      isClearable,
      clearHidden,
    }
  },
})

function useClasses(props: InputProps, config: InputConfig, isFocused: Ref<boolean>, disabled: ComputedRef<boolean>) {
  return computed(() => {
    const sizeClass = `ix-input-${props.size ?? config.size}`
    return {
      [sizeClass]: true,
      'ix-input-disabled': disabled.value,
      'ix-input-borderless': props.borderless ?? config.borderless,
      'ix-input-focused': isFocused.value,
    }
  })
}
</script>
