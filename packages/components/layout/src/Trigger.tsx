/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { triggerProps } from './types'

export default defineComponent({
  name: 'IxLayoutSiderTrigger',
  props: triggerProps,
  setup(props) {
    const classes = computed(() => {
      return {
        'ix-layout-sider-trigger': true,
        'ix-layout-sider-trigger-collapsed': props.collapsed,
      }
    })

    const handleClick = () => {
      callEmit(props.onClick, !props.collapsed)
    }

    return () => {
      return (
        <div class={classes.value} onClick={handleClick}>
          <div class="ix-layout-sider-trigger-top"></div>
          <div class="ix-layout-sider-trigger-bottom"></div>
        </div>
      )
    }
  },
})
