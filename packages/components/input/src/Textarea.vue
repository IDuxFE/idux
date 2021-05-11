<template>
  <span :class="['ix-textarea', classes, $attrs.class]" :style="$attrs.style" :data-count="dataCount">
    <textarea
      ref="textareaRef"
      v-bind="attrs"
      class="ix-textarea-inner"
      :style="{ resize: resize$$ }"
      :disabled="disabled"
      :readonly="readonly"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    >
    </textarea>
    <span v-if="isClearable" class="ix-textarea-suffix">
      <ix-icon :class="{ 'ix-textarea-clear-icon-hidden': clearHidden }" name="close-circle" @click="onClearClick" />
    </span>
  </span>
</template>
<script lang="ts">
import type { Ref } from 'vue'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { TextareaConfig } from '@idux/components/config'
import type { TextareaProps } from './types'

import { computed, defineComponent, ref } from 'vue'
import { ControlPropType } from '@idux/cdk/forms'
import { PropTypes, withUndefined } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useAttrs } from '@idux/components/utils'
import { IxIcon } from '@idux/components/icon'
import { useAutoRows } from './useAutoRows'
import { useCommonBindings } from './useCommonBindings'

export default defineComponent({
  name: 'IxTextarea',
  components: { IxIcon },
  props: {
    value: PropTypes.string,
    control: ControlPropType,
    disabled: PropTypes.bool.def(false),
    readonly: PropTypes.bool.def(false),
    resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical'] as const),
    autoRows: withUndefined(
      PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ minRows: PropTypes.number, maxRows: PropTypes.number })]),
    ),
    showCount: PropTypes.bool,
    maxCount: withUndefined(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    computeCount: PropTypes.func,
    size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
    clearable: PropTypes.bool,
  },
  emits: ['update:value', 'compositionStart', 'compositionEnd', 'input', 'focus', 'blur', 'afterClear'],
  setup(props: TextareaProps) {
    const attrs = useAttrs()
    const textareaConfig = useGlobalConfig('textarea')
    const textareaRef = ref(null as unknown as HTMLTextAreaElement)

    const {
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
      valueAccessor,
    } = useCommonBindings(props, textareaConfig, textareaRef)

    const classes = useClasses(props, textareaConfig, isFocused)
    const dataCount = useDataCount(props, textareaConfig, valueAccessor)
    const resize$$ = computed(() => {
      const autoRows = props.autoRows ?? textareaConfig.autoRows
      const resize = props.resize ?? textareaConfig.resize
      if (autoRows) {
        return resize === 'horizontal' ? 'horizontal' : 'none'
      } else {
        return resize
      }
    })

    const autoRows = computed(() => props.autoRows ?? textareaConfig.autoRows)
    useAutoRows(textareaRef, autoRows, valueAccessor)

    return {
      focus,
      blur,
      attrs,
      textareaRef,
      classes,
      dataCount,
      resize$$,
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

function useClasses(props: TextareaProps, config: TextareaConfig, isFocused: Ref<boolean>) {
  return computed(() => {
    const sizeClass = `ix-textarea-${props.size ?? config.size}`
    return {
      [sizeClass]: true,
      'ix-textarea-disabled': props.disabled,
      'ix-textarea-focused': isFocused.value,
      'ix-textarea-with-count': props.showCount ?? config.showCount,
    }
  })
}

function useDataCount(props: TextareaProps, config: TextareaConfig, valueAccessor: ValueAccessor) {
  return computed(() => {
    const showCount = props.showCount ?? config.showCount
    const computeCount = props.computeCount ?? config.computeCount
    const maxCount = props.maxCount ?? config.maxCount
    let dataCount = ''
    if (showCount) {
      const value = valueAccessor.value ?? ''
      dataCount = value.length
      if (computeCount) {
        dataCount = computeCount(value)
      } else if (maxCount) {
        dataCount += ' / ' + maxCount
      }
    }
    return dataCount
  })
}
</script>
