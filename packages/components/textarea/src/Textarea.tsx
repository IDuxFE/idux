import type { ComputedRef, Ref, Slot, StyleValue } from 'vue'
import type { FormAccessor } from '@idux/cdk/forms'
import type { TextareaConfig } from '@idux/components/config'
import type { TextareaProps } from './types'

import { computed, defineComponent, normalizeClass } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { ɵUseCommonBindings } from '@idux/components/input'
import { useAutoRows } from './useAutoRows'
import { textareaProps } from './types'

export default defineComponent({
  name: 'IxTextarea',
  props: textareaProps,
  setup(props, { slots, expose, attrs }) {
    const config = useGlobalConfig('textarea')

    const {
      elementRef,
      accessor,

      isDisabled,
      clearIcon,
      clearHidden,
      isClearable,
      isFocused,

      focus,
      blur,

      handlerInput,
      handlerCompositionStart,
      handlerCompositionEnd,
      handlerFocus,
      handlerBlur,
      handlerClear,
    } = ɵUseCommonBindings(props, config)

    expose({ focus, blur })

    const classes = useClasses(props, config, isFocused, isDisabled)
    const dataCount = useDataCount(props, config, accessor)
    const autoRows = computed(() => props.autoRows ?? config.autoRows)
    const resize = computed(() => {
      const resize = props.resize ?? config.resize
      if (autoRows.value) {
        return resize === 'horizontal' ? 'horizontal' : 'none'
      } else {
        return resize
      }
    })
    const textareaStyle = computed(() => ({ resize: resize.value }))

    useAutoRows(elementRef as Ref<HTMLTextAreaElement>, autoRows, accessor)

    return () => {
      const { prefixCls } = useGlobalConfig('common')
      const suffix = renderSuffix(isClearable.value, slots.clearIcon, clearIcon.value, clearHidden.value, handlerClear)
      const { class: className, style, ...rest } = attrs
      return (
        <span
          class={normalizeClass([classes.value, className])}
          style={style as StyleValue}
          data-count={dataCount.value}
        >
          <textarea
            {...rest}
            ref={elementRef}
            class={`${prefixCls}-textarea-inner`}
            style={textareaStyle.value}
            disabled={isDisabled.value}
            readonly={props.readonly}
            onInput={handlerInput}
            onCompositionstart={handlerCompositionStart}
            onCompositionend={handlerCompositionEnd}
            onFocus={handlerFocus}
            onBlur={handlerBlur}
          ></textarea>
          {suffix}
        </span>
      )
    }
  },
})

function useClasses(
  props: TextareaProps,
  config: TextareaConfig,
  isFocused: Ref<boolean>,
  disabled: ComputedRef<boolean>,
) {
  return computed(() => {
    const { prefixCls } = useGlobalConfig('common')
    const sizeClass = `${prefixCls}-textarea-${props.size ?? config.size}`
    return {
      [`${prefixCls}-textarea`]: true,
      [sizeClass]: true,
      [`${prefixCls}-textarea-disabled`]: disabled.value,
      [`${prefixCls}-textarea-focused`]: isFocused.value,
      [`${prefixCls}-textarea-with-count`]: props.showCount ?? config.showCount,
    }
  })
}

function useDataCount(props: TextareaProps, config: TextareaConfig, accessor: FormAccessor) {
  return computed(() => {
    const showCount = props.showCount ?? config.showCount
    const computeCount = props.computeCount ?? config.computeCount
    const maxCount = props.maxCount ?? config.maxCount
    let dataCount = ''
    if (showCount) {
      const value = accessor.value ?? ''
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

function renderSuffix(
  isClearable: boolean,
  clearIconSlot: Slot | undefined,
  clearIcon: string,
  clearHidden: boolean,
  handlerClear: (evt: MouseEvent) => void,
) {
  if (!isClearable) {
    return null
  }
  const { prefixCls } = useGlobalConfig('common')
  const classes = { [`${prefixCls}-textarea-suffix`]: true, [`${prefixCls}-textarea-suffix-hidden`]: clearHidden }
  const child = clearIconSlot?.({ handlerClear }) ?? <IxIcon name={clearIcon} onClick={handlerClear}></IxIcon>
  return <span class={classes}>{child}</span>
}
