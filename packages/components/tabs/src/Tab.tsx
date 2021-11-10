/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { tabsToken } from './tokens'
import { tabProps } from './types'

export default defineComponent({
  __IDUX_TAB: true,
  name: 'IxTab',
  props: tabProps,
  setup(props, { slots }) {
    const { mergedPrefixCls } = inject(tabsToken)!

    return () => {
      return <div class={`${mergedPrefixCls.value}-pane`}>{slots.default?.()}</div>
    }
  },
})
