/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

import { proLayoutToken } from './token'
import { proLayoutSiderTriggerProps } from './types'

export default defineComponent({
  name: 'IxProLayoutSiderTrigger',
  props: proLayoutSiderTriggerProps,
  setup(props, { slots }) {
    const { mergedPrefixCls, collapsed, setCollapsed } = inject(proLayoutToken)!

    const icon = computed(() => {
      const [fold = 'menu-fold', unfold = 'menu-unfold'] = props.icon || []
      return collapsed.value ? fold : unfold
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-sider-trigger`
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
