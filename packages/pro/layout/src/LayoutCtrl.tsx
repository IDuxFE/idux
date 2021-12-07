/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CommonConfig } from '@idux/pro/config'
import type { VNode } from 'vue'

import { computed, defineComponent, h, inject } from 'vue'

import { isString } from 'lodash-es'

import { throwError } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { useGlobalConfig } from '@idux/pro/config'

import { LayoutProToken } from './token'
import { layoutProCtrlProps } from './types'

const defaultFoldIcon = 'menu-fold'
const defaultUnfoldIcon = 'menu-unfold'

export default defineComponent({
  name: 'IxLayoutProCtrl',
  props: layoutProCtrlProps,
  setup(props) {
    const layoutProCollapsed = inject(LayoutProToken, null)
    if (layoutProCollapsed === null) {
      throwError('pro/layout', '<IxLayoutPro> not found.')
      return <></>
    }
    const commonConfig = useGlobalConfig('common')
    const cmpCls = useCmpCls(commonConfig)
    const { collapsed, changeCollapsed } = layoutProCollapsed
    const onClickIcon = () => {
      changeCollapsed(!collapsed.value)
    }

    return () => {
      const renderIcon = collapsed.value
        ? getIconVNode(props.foldedIcon ?? defaultFoldIcon)
        : getIconVNode(props.unfoldedIcon ?? defaultUnfoldIcon)
      return (
        <div class={cmpCls.value} onClick={onClickIcon}>
          {renderIcon}
        </div>
      )
    }
  },
})

function useCmpCls(config: CommonConfig) {
  return computed(() => `${config.prefixCls}-layout-pro-ctrl`)
}

function getIconVNode(icon: string | VNode) {
  if (isString(icon)) {
    return h(IxIcon, { name: icon })
  }
  return icon
}
