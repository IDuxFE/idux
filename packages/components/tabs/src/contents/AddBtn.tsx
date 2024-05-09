/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import { tabsToken } from '../tokens'

export default defineComponent({
  setup(_, { slots }) {
    const { props, mergedPrefixCls } = inject(tabsToken)!

    const handleAdd = () => {
      callEmit(props.onAdd)
    }

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <span class={`${prefixCls}-nav-add-btn`} onClick={handleAdd}>
          {slots.addIcon?.() ?? <IxIcon name="plus" />}
        </span>
      )
    }
  },
})
