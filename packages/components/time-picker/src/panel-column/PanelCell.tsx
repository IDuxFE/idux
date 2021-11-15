/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { callEmit, isNumeric } from '@idux/cdk/utils'

import { timePickerToken } from '../tokens'
import { panelCellProps } from '../types'

export default defineComponent({
  props: panelCellProps,
  setup(props) {
    const { mergedPrefixCls } = inject(timePickerToken)!
    const classes = computed(() => {
      return {
        [`${mergedPrefixCls.value}-panel-cell`]: true,
        [`${mergedPrefixCls.value}-panel-cell-disabled`]: props.disabled,
        [`${mergedPrefixCls.value}-panel-cell-selected`]: props.selected,
      }
    })

    const onClick = () => {
      if (!props.disabled && !props.selected) {
        callEmit(props.onChange, props.value)
      }
    }

    const displayValue = computed(() => displayFormat(props.value))

    return () => (
      <li class={classes.value} onClick={onClick}>
        {displayValue.value}
      </li>
    )
  },
})

function displayFormat(val: string | number) {
  return isNumeric(val) ? val.toString().padStart(2, '0') : val
}
