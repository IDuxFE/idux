/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { ɵDropdownToken } from '@idux/components/dropdown'

import { menuSubToken, menuToken } from '../../token'
import { coverChildren } from '../Utils'

export default defineComponent({
  name: 'MenuSubOverlayContent',
  setup() {
    const { mergedPrefixCls, theme, mergedGetKey } = inject(menuToken)!
    const { props, handleMouseEvent } = inject(menuSubToken)!
    const dropdownContext = inject(ɵDropdownToken, null)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-dropdown`]: !!dropdownContext,
        [`${prefixCls}-vertical`]: true,
        [`${prefixCls}-${theme.value}`]: true,
      })
    })

    const events = computed(() => {
      if (props.data.disabled) {
        return undefined
      }
      return {
        onMouseenter: () => handleMouseEvent(true),
        onMouseleave: () => handleMouseEvent(false),
      }
    })

    return () => (
      <ul class={classes.value} {...events.value}>
        {coverChildren(props.data.children, mergedGetKey.value)}
      </ul>
    )
  },
})
