/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextareaProps } from './types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { TextareaConfig } from '@idux/components/config'
import type { Ref, Slot, StyleValue } from 'vue'

import { computed, defineComponent, normalizeClass } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { ɵUseCommonBindings } from '@idux/components/input'

import { textareaProps } from './types'
import { useAutoRows } from './useAutoRows'

export default defineComponent({
  name: 'IxTextarea',
  inheritAttrs: false,
  props: textareaProps,
  setup(props, { slots, expose, attrs }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-textarea`)
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

    const classes = computed(() => {
      const { showCount = config.showCount, size = config.size } = props
      const prefixCls = mergedPrefixCls.value
      const classes = {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-with-count`]: showCount,
        [`${prefixCls}-${size}`]: true,
      }
      return normalizeClass([classes, attrs.class])
    })
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
      const { class: className, style, ...rest } = attrs
      const prefixCls = mergedPrefixCls.value
      return (
        <span class={classes.value} style={style as StyleValue} data-count={dataCount.value}>
          <textarea
            {...rest}
            ref={elementRef}
            class={`${prefixCls}-inner`}
            style={textareaStyle.value}
            disabled={isDisabled.value}
            readonly={props.readonly}
            onInput={handlerInput}
            onCompositionstart={handlerCompositionStart}
            onCompositionend={handlerCompositionEnd}
            onFocus={handlerFocus}
            onBlur={handlerBlur}
          />
          {renderSuffix(
            isClearable.value,
            slots.clearIcon,
            clearIcon.value,
            clearHidden.value,
            handlerClear,
            prefixCls,
          )}
        </span>
      )
    }
  },
})

function useDataCount(props: TextareaProps, config: TextareaConfig, accessor: FormAccessor) {
  return computed(() => {
    const showCount = props.showCount ?? config.showCount
    const computeCount = props.computeCount ?? config.computeCount
    const maxCount = props.maxCount ?? config.maxCount
    let dataCount = ''
    if (showCount) {
      const value = accessor.valueRef.value ?? ''
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
  onClear: (evt: MouseEvent) => void,
  prefixCls: string,
) {
  if (!isClearable) {
    return null
  }

  let classes = `${prefixCls}-suffix`
  if (clearHidden) {
    classes += ` ${prefixCls}-suffix-hidden`
  }
  const children = clearIconSlot?.({ onClear }) ?? <IxIcon name={clearIcon} onClick={onClear}></IxIcon>
  return <span class={classes}>{children}</span>
}
