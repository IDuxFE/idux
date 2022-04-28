/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { selectToken } from '../token'
import { optionGroupProps } from '../types'

export default defineComponent({
  props: optionGroupProps,
  setup(props) {
    const { props: selectProps, slots, mergedPrefixCls } = inject(selectToken)!
    return () => {
      const { label, rawData } = props
      const prefixCls = `${mergedPrefixCls.value}-option-group`
      const labelRender = rawData.customLabel ?? 'optionGroupLabel'
      const labelSlot = isString(labelRender) ? slots[labelRender] : labelRender

      const customAdditional = selectProps.customAdditional
        ? selectProps.customAdditional({ data: rawData, index: props.index })
        : undefined

      return (
        <div class={prefixCls} title={label} aria-label={label} {...rawData.additional} {...customAdditional}>
          <span class={`${prefixCls}-label`}>{labelSlot ? labelSlot(rawData) : label}</span>
        </div>
      )
    }
  },
})
