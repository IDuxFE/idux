/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { treeToken } from '../token'

export default defineComponent({
  setup() {
    const { props, mergedPrefixCls, slots } = inject(treeToken)!

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-node-leaf`

      let children: VNodeTypes | undefined
      if (slots.leafLineIcon) {
        children = slots.leafLineIcon()
      } else if (props.leafLineIcon) {
        children = <IxIcon name={props.leafLineIcon} />
      } else {
        children = <span class={`${prefixCls}-line`}></span>
      }

      return <span class={prefixCls}>{children}</span>
    }
  },
})
