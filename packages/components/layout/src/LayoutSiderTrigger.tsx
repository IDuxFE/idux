/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { layoutSiderToken } from './token'
import { layoutSiderTriggerProps } from './types'

export default defineComponent({
  name: 'IxLayoutSiderTrigger',
  props: layoutSiderTriggerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-sider-trigger`)
    const { collapsed, setCollapsed } = inject(layoutSiderToken)!

    const icon = computed(() => {
      const [fold = 'menu-fold', unfold = 'menu-unfold'] = props.icons || []
      return collapsed.value ? fold : unfold
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value,
      }
    })

    const handleClick = () => setCollapsed(!collapsed.value)

    return () => {
      let children: VNodeTypes
      if (slots.default) {
        children = slots.default({ collapsed: collapsed.value })
      } else {
        const iconValue = icon.value
        children = isString(iconValue) ? <IxIcon name={iconValue} /> : iconValue
      }
      return (
        <div class={classes.value} onClick={handleClick}>
          {children}
        </div>
      )
    }
  },
})
