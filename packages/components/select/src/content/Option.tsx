/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { isNil } from 'lodash-es'

import { IxCheckbox } from '@idux/components/checkbox'
import { useKey } from '@idux/components/utils'

import { selectToken } from '../token'
import { optionProps } from '../types'
import { renderOptionLabel } from '../utils/renderOptionLabel'

export default defineComponent({
  props: optionProps,
  setup(props) {
    const key = useKey()
    const {
      props: selectProps,
      slots,
      mergedPrefixCls,
      selectedValue,
      selectedLimit,
      selectedLimitTitle,
      handleOptionClick,
      activeOption,
      changeActive,
    } = inject(selectToken)!

    const isActive = computed(() => {
      const compareFn = selectProps.compareWith ?? selectProps.compareFn
      const activeValue = activeOption.value?.key
      return compareFn(activeValue, key)
    })

    const isSelected = computed(() => {
      const compareFn = selectProps.compareWith ?? selectProps.compareFn
      return selectedValue.value.some(item => compareFn(item, key))
    })

    const classes = computed(() => {
      const { disabled, parentKey } = props
      const prefixCls = `${mergedPrefixCls.value}-option`
      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-grouped`]: !isNil(parentKey),
        [`${prefixCls}-selected`]: isSelected.value,
      }
    })

    const handleMouseEnter = () => changeActive(props.index, 0)

    const handleClick = () => handleOptionClick(key)

    return () => {
      const { disabled, label, rawData } = props
      const { multiple } = selectProps
      const selected = isSelected.value
      const prefixCls = `${mergedPrefixCls.value}-option`
      // 优先显示 selectedLimitTitle
      const title = (!(disabled || selected) && selectedLimitTitle.value) || label
      const customAdditional = selectProps.customAdditional
        ? selectProps.customAdditional({ data: rawData, index: props.index })
        : undefined

      return (
        <div
          class={classes.value}
          title={title}
          onMouseenter={disabled ? undefined : handleMouseEnter}
          onClick={disabled ? undefined : handleClick}
          aria-label={label}
          aria-selected={selected}
          {...rawData.additional}
          {...customAdditional}
        >
          {multiple && <IxCheckbox checked={selected} disabled={disabled || (!selected && selectedLimit.value)} />}
          <span class={`${prefixCls}-label`}>{renderOptionLabel(slots, rawData, label)}</span>
        </div>
      )
    }
  },
})
