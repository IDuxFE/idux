/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNode } from 'vue'

import { defineComponent, h, inject } from 'vue'

import { isString } from 'lodash-es'

import { throwError } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import { LayoutProToken } from './token'
import { layoutSiderTriggerProps } from './types'

const defaultFoldIcon = 'menu-fold'
const defaultUnfoldIcon = 'menu-unfold'

const prefixCls = 'ix'
const cmpCls = `${prefixCls}-layout-pro-ctrl`

export default defineComponent({
  name: 'IxLayoutSiderTrigger',
  props: layoutSiderTriggerProps,
  setup(props) {
    const layoutProCollapsed = inject(LayoutProToken, null)
    if (layoutProCollapsed === null) {
      throwError('pro/layout', '<IxLayoutPro> not found.')
      return <></>
    }
    const { collapsed, changeCollapsed } = layoutProCollapsed
    const onClickIcon = () => {
      changeCollapsed(!collapsed.value)
    }

    return () => {
      const renderIcon = collapsed.value
        ? getIconVNode(props.foldedIcon ?? defaultFoldIcon)
        : getIconVNode(props.unfoldedIcon ?? defaultUnfoldIcon)
      return (
        <div class={cmpCls} onClick={onClickIcon}>
          {renderIcon}
        </div>
      )
    }
  },
})

function getIconVNode(icon: string | VNode) {
  if (isString(icon)) {
    return h(IxIcon, { name: icon })
  }
  return icon
}
