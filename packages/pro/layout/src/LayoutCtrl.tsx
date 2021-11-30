/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProCtrlType } from './types'
import type { CommonConfig } from '@idux/pro/config'

import { computed, defineComponent, inject } from 'vue'

import { throwError } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { useGlobalConfig } from '@idux/pro/config'

import { LayoutProToken } from './token'

export default defineComponent({
  name: 'IxLayoutProCtrl',
  setup() {
    const layoutProCollapsed = inject(LayoutProToken, null)
    if (layoutProCollapsed === null) {
      throwError('pro/layout', '<IxLayoutPro> not found.')
      return <></>
    }
    const commonConfig = useGlobalConfig('common')
    const cmpCls = useCmpCls(commonConfig)
    const { collapsed, changeCollapsed } = layoutProCollapsed
    const foldIcon = useFoldIcon(collapsed)
    const onClickIcon = () => {
      changeCollapsed(!collapsed.value)
    }

    return () => (
      <div class={cmpCls.value}>
        <IxIcon name={foldIcon.value} onClick={onClickIcon}></IxIcon>
      </div>
    )
  },
})

function useFoldIcon(collapsed: LayoutProCtrlType['collapsed']) {
  return computed(() => (collapsed.value ? 'menu-fold' : 'menu-unfold'))
}

function useCmpCls(config: CommonConfig) {
  return computed(() => `${config.prefixCls}-layout-pro-ctrl`)
}
