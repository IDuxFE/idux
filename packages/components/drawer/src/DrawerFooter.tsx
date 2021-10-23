/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { defineComponent, inject, isVNode } from 'vue'

import { IxButton } from '@idux/components/button'

import { drawerToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, mergedPrefixCls } = inject(drawerToken)!

    return () => {
      const { footer } = props
      if (!footer && !slots.footer) {
        return null
      }

      let children: VNodeTypes
      if (slots.footer) {
        children = slots.footer()
      } else {
        if (isVNode(footer)) {
          children = footer
        } else {
          children = footer!.map(item => {
            const { text, ...rest } = item
            return <IxButton {...rest}>{text}</IxButton>
          })
        }
      }

      return <div class={`${mergedPrefixCls.value}-footer`}>{children}</div>
    }
  },
})
