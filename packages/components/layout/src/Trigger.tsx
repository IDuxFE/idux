/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { triggerProps } from './types'

export default defineComponent({
  name: 'IxLayoutSiderTrigger',
  props: triggerProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-sider-trigger`)
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: props.collapsed,
      }
    })

    const handleClick = () => {
      callEmit(props.onClick, !props.collapsed)
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <div class={classes.value} onClick={handleClick}>
          <div class={`${prefixCls}-top`}></div>
          <div class={`${prefixCls}-bottom`}></div>
        </div>
      )
    }
  },
})
