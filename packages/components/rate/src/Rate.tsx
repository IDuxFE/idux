/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, ref } from 'vue'

import { callEmit, convertNumber } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useFormAccessor, useFormElement, useFormSize } from '@idux/components/form'
import { IxIcon } from '@idux/components/icon'

import RateItem from './RateItem'
import { rateProps } from './types'

export default defineComponent({
  name: 'IxRate',
  props: rateProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-rate`)
    const config = useGlobalConfig('rate')
    const mergedSize = useFormSize(props, config)

    const { elementRef, focus, blur } = useFormElement()
    expose({ focus, blur })

    const accessor = useFormAccessor<number>()

    const countRef = computed(() => convertNumber(props.count ?? config.count))
    const iconRef = computed(() => props.icon ?? config.icon)
    const allowHalfRef = computed(() => props.allowHalf ?? config.allowHalf)
    const clearableRef = computed(() => props.clearable ?? config.clearable)
    const isDisabled = computed(() => accessor.disabled.value)
    const isFocused = ref(false)

    const hoverValue = ref<number>()

    const changeValue = (value: number) => {
      callEmit(props.onChange, value)
      accessor.setValue(value)
    }

    const calcValue = (evt: MouseEvent, element: HTMLElement, index: number) => {
      let value = index + 1
      if (allowHalfRef.value) {
        if (evt.offsetX < element.clientWidth / 2) {
          value -= 0.5
        }
      }
      return value
    }

    const handleItemClick = (evt: MouseEvent, element: HTMLElement, index: number) => {
      const currValue = accessor.valueRef.value
      const newValue = calcValue(evt, element, index)
      const isClear = clearableRef.value && currValue === newValue

      changeValue(isClear ? 0 : newValue)
    }

    const handleItemMouseMove = (evt: MouseEvent, element: HTMLElement, index: number) => {
      const newValue = calcValue(evt, element, index)
      hoverValue.value = newValue
    }

    const handleFocus = (evt: FocusEvent) => {
      isFocused.value = true
      callEmit(props.onFocus, evt)
    }

    const handleBlur = (evt: FocusEvent) => {
      isFocused.value = false
      callEmit(props.onBlur, evt)
      accessor.markAsBlurred()
    }

    const handleKeyDown = (evt: KeyboardEvent) => {
      const currValue = accessor.valueRef.value
      const currCount = countRef.value
      const currAllowHalf = allowHalfRef.value
      const eventCode = evt.code
      switch (eventCode) {
        case 'ArrowRight':
        case 'ArrowUp':
          {
            if (currValue < currCount) {
              changeValue(currValue + (currAllowHalf ? 0.5 : 1))
              evt.preventDefault()
            }
          }
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          if (currValue > 0) {
            changeValue(currValue - (currAllowHalf ? 0.5 : 1))
            evt.preventDefault()
          }
          break
      }
    }

    const handleMouseLeave = () => {
      hoverValue.value = undefined
    }

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-${mergedSize.value}`]: true,
      })
    })

    return () => {
      const count = countRef.value
      const disabled = isDisabled.value
      const focused = isFocused.value
      const itemValue = convertNumber(hoverValue.value ?? accessor.valueRef.value)
      const itemPrefixCls = `${mergedPrefixCls.value}-item`

      const { tooltips } = props
      const children = []
      for (let index = 0; index < count; index++) {
        children.push(
          <RateItem
            key={index}
            count={count}
            disabled={disabled}
            focused={focused}
            index={index}
            prefixCls={itemPrefixCls}
            tooltip={tooltips[index]}
            value={itemValue}
            onClick={handleItemClick}
            onMouseMove={handleItemMouseMove}
          >
            {slots.icon?.({ disabled, focused, index }) ?? <IxIcon name={iconRef.value} />}
          </RateItem>,
        )
      }

      return (
        <ul
          ref={elementRef}
          class={classes.value}
          tabindex={disabled ? -1 : (attrs.tabindex as number)}
          onFocus={disabled ? undefined : handleFocus}
          onBlur={disabled ? undefined : handleBlur}
          onKeydown={disabled ? undefined : handleKeyDown}
          onMouseleave={disabled ? undefined : handleMouseLeave}
          role="radiogroup"
        >
          {children}
        </ul>
      )
    }
  },
})
