/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxCheckbox } from '@idux/components/checkbox'

import { treeToken } from '../token'
import { treeNodeCheckboxProps } from '../types'

export default defineComponent({
  props: treeNodeCheckboxProps,
  setup(props) {
    const {
      mergedPrefixCls,
      isChecked: _isChecked,
      isIndeterminate: _isIndeterminate,
      handleCheck,
    } = inject(treeToken)!
    const isChecked = computed(() => {
      return _isChecked(props.node.key)
    })
    const isIndeterminate = computed(() => _isIndeterminate(props.node.key))

    const onChange = () => handleCheck(props.node)

    return () => (
      <IxCheckbox
        class={`${mergedPrefixCls.value}-node-checkbox`}
        checked={isChecked.value}
        disabled={props.checkDisabled}
        indeterminate={isIndeterminate.value}
        onChange={onChange}
      />
    )
  },
})
