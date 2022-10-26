/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, computed, defineComponent, normalizeClass, onMounted, watch } from 'vue'

import { type FormAccessor } from '@idux/cdk/forms'
import { type TextareaConfig, useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { ɵUseInput } from '@idux/components/input'

import { useAutoRows } from './composables/useAutoRows'
import { type TextareaProps, textareaProps } from './types'

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
      mergedSize,
      mergedStatus,
      clearable,
      clearIcon,
      clearVisible,
      isFocused,
      isComposing,

      focus,
      blur,

      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleClear,
      syncValue,
    } = ɵUseInput<HTMLTextAreaElement>(props, config)

    expose({ focus, blur })

    const classes = computed(() => {
      const { showCount = config.showCount } = props
      const status = mergedStatus.value
      const prefixCls = mergedPrefixCls.value
      const classes = {
        [prefixCls]: true,
        [`${prefixCls}-${mergedSize.value}`]: true,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-clearable`]: clearable.value,
        [`${prefixCls}-disabled`]: accessor.disabled,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-with-count`]: showCount,
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

    const { resizeToFitContent } = useAutoRows(elementRef, autoRows)
    onMounted(() => {
      syncValue()
      watch(() => accessor.value, resizeToFitContent, { immediate: true })
    })

    const _handleInput = (evt: Event) => {
      handleInput(evt)
      if (isComposing.value) {
        resizeToFitContent()
      }
    }

    return () => {
      const { class: className, style, ...rest } = attrs
      const prefixCls = mergedPrefixCls.value
      return (
        <span class={classes.value} style={style as CSSProperties} data-count={dataCount.value}>
          <textarea
            {...rest}
            ref={elementRef}
            class={`${prefixCls}-inner`}
            style={textareaStyle.value}
            disabled={accessor.disabled}
            readonly={props.readonly}
            onInput={_handleInput}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
          />
          {clearable.value && (
            <span
              class={normalizeClass([`${prefixCls}-clear`, clearVisible.value ? 'visible' : ''])}
              onClick={handleClear}
            >
              {slots.clearIcon ? slots.clearIcon() : <IxIcon name={clearIcon.value}></IxIcon>}
            </span>
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
