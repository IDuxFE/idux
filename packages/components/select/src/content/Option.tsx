/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { IxCheckbox } from '@idux/components/checkbox'

import { selectToken } from '../token'
import { optionProps } from '../types'

export default defineComponent({
  props: optionProps,
  setup(props) {
    const {
      props: selectProps,
      slots,
      mergedPrefixCls,
      selectedValue,
      handleOptionClick,
      activeOption,
      changeActive,
    } = inject(selectToken)!

    const isActive = computed(() => {
      const { value } = props
      const { compareWith } = selectProps
      const activeValue = activeOption.value?.value
      return compareWith(activeValue, value)
    })

    const isSelected = computed(() => {
      const { value } = props
      const { compareWith } = selectProps
      return selectedValue.value.some(item => compareWith(item, value))
    })

    const classes = computed(() => {
      const { disabled, type } = props
      const prefixCls = `${mergedPrefixCls.value}-option`
      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-grouped`]: type === 'grouped',
        [`${prefixCls}-selected`]: isSelected.value,
      }
    })

    const handleMouseEnter = () => changeActive(props.index, 0)

    const handleClick = () => handleOptionClick(props.value)

    return () => {
      const { disabled, label, rawOption } = props
      const { multiple } = selectProps
      const selected = isSelected.value
      const prefixCls = `${mergedPrefixCls.value}-option`
      const labelRender = rawOption.customLabel ?? 'optionLabel'
      const labelSlot = isString(labelRender) ? slots[labelRender] : labelRender
      return (
        <div
          class={classes.value}
          onMouseenter={disabled ? undefined : handleMouseEnter}
          onClick={disabled ? undefined : handleClick}
          {...rawOption.additional}
          aria-label={label}
          aria-selected={selected}
        >
          {multiple && <IxCheckbox checked={isSelected.value} disabled={disabled} />}
          <span class={`${prefixCls}-label`}>{labelSlot ? labelSlot(rawOption) : label}</span>
        </div>
      )
    }
  },
})
