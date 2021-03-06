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
        <slot name="prefix"><ix-icon :name="prefix" @click="onPrefixClick" /></slot>
      </span>
      <input
        ref="inputRef"
        v-bind="attrs"
        class="ix-input-inner"
        :disabled="disabled"
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
        <slot name="suffix"><ix-icon :name="suffix" @click="onSuffixClick" /></slot>
      </span>
    </span>
    <span v-if="addonAfter || $slots.addonAfter" class="ix-input-addon">
      <slot name="addonAfter">{{ addonAfter }}</slot>
    </span>
  </span>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import type { InputConfig } from '@idux/components/core/config'
import type { InputProps } from './types'

import { computed, defineComponent, ref } from 'vue'
import { ControlPropType } from '@idux/cdk/forms'
import { PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/core/config'
import { useAttrs } from '@idux/components/core/utils'
import { IxIcon } from '@idux/components/icon'
import { useCommonBindings } from './useCommonBindings'

export default defineComponent({
  name: 'IxInput',
  components: { IxIcon },
  inheritAttrs: false,
  props: {
    value: PropTypes.string,
    control: ControlPropType,
    disabled: PropTypes.bool.def(false),
    readonly: PropTypes.bool.def(false),
    addonAfter: PropTypes.string,
    addonBefore: PropTypes.string,
    suffix: PropTypes.string,
    prefix: PropTypes.string,
    size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
    clearable: PropTypes.bool,
    borderless: PropTypes.bool,
  },
  emits: [
    'update:value',
    'compositionStart',
    'compositionEnd',
    'input',
    'focus',
    'blur',
    'suffixClick',
    'prefixClick',
    'afterClear',
  ],
  setup(props: InputProps, { emit }) {
    const attrs = useAttrs()
    const inputConfig = useGlobalConfig('input')
    const inputRef = ref((null as unknown) as HTMLInputElement)

    const {
      onCompositionStart,
      onCompositionEnd,
      onInput,
      onFocus,
      onBlur,
      onClearClick,
      isClearable,
      clearHidden,
      isFocused,
      valueAccessor,
    } = useCommonBindings(props, inputConfig, inputRef)

    const classes = useClasses(props, inputConfig, isFocused)

    const onSuffixClick = (evt: MouseEvent) => emit('suffixClick', valueAccessor.value, evt)
    const onPrefixClick = (evt: MouseEvent) => emit('prefixClick', valueAccessor.value, evt)

    return {
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
      onSuffixClick,
      onPrefixClick,
    }
  },
})

function useClasses(props: InputProps, config: InputConfig, isFocused: Ref<boolean>) {
  return computed(() => {
    const sizeClass = `ix-input-${props.size ?? config.size}`
    return {
      [sizeClass]: true,
      'ix-input-disabled': props.disabled,
      'ix-input-borderless': props.borderless ?? config.borderless,
      'ix-input-focused': isFocused.value,
    }
  })
}
</script>
