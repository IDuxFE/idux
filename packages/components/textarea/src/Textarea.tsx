/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type Ref,
  type Slot,
  type StyleValue,
  computed,
  defineComponent,
  normalizeClass,
  onMounted,
  ref,
  watch,
} from 'vue'

import { type FormAccessor } from '@idux/cdk/forms'
import { type TextareaConfig, useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { ɵUseInput } from '@idux/components/input'

import { type TextareaProps, textareaProps } from './types'
import { useAutoRows } from './useAutoRows'

export default defineComponent({
  name: 'IxTextarea',
  inheritAttrs: false,
  props: textareaProps,
  setup(props, { slots, expose, attrs }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-textarea`)
    const config = useGlobalConfig('textarea')
    const isScroll = ref(false)

    const {
      elementRef,
      accessor,
      clearable,
      clearIcon,
      clearVisible,
      isFocused,

      focus,
      blur,

      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleClear,
      syncValue,
    } = ɵUseInput(props, config)

    expose({ focus, blur })

    onMounted(() => {
      syncValue()
    })

    const classes = computed(() => {
      const { showCount = config.showCount, size = config.size } = props
      const prefixCls = mergedPrefixCls.value
      const classes = {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: accessor.disabled,
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

    watch(
      () => accessor.value,
      () => {
        if (clearable.value) {
          if (elementRef.value?.scrollHeight !== elementRef.value?.clientHeight) {
            isScroll.value = true
          } else {
            isScroll.value = false
          }
        }
      },
    )

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
            disabled={accessor.disabled}
            readonly={props.readonly}
            onInput={handleInput}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
          />
          {renderSuffix(
            clearable.value,
            slots.clearIcon,
            clearIcon.value,
            clearVisible.value,
            handleClear,
            prefixCls,
            isScroll.value,
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

export function renderSuffix(
  isClearable: boolean,
  clearIconSlot: Slot | undefined,
  clearIcon: string,
  clearVisible: boolean,
  onClear: (evt: MouseEvent) => void,
  prefixCls: string,
  isScroll: boolean,
): JSX.Element | null {
  if (!isClearable) {
    return null
  }

  let classes = `${prefixCls}-suffix`
  if (!clearVisible) {
    classes += ` ${prefixCls}-suffix-hidden`
  }
  if (isScroll) {
    classes += ` ${prefixCls}-suffix-scroll`
  }

  return (
    <span class={classes} onClick={onClear}>
      {clearIconSlot ? clearIconSlot() : <IxIcon name={clearIcon}></IxIcon>}
    </span>
  )
}
