/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { ɵDropdownToken } from '@idux/components/dropdown'

import { menuSubToken } from '../token'

export default defineComponent({
  setup() {
    const { props, slots, mode, theme, handleMouseEvent } = inject(menuSubToken)!
    const dropdownContext = inject(ɵDropdownToken, null)

    const classes = computed(() => {
      return {
        'ix-menu-content': true,
        'ix-menu-vertical': true,
        [`ix-menu-${theme.value}`]: true,
        'ix-menu-dropdown': !!dropdownContext,
      }
    })

    const events = computed(() => {
      if (props.disabled && mode.value === 'inline') {
        return undefined
      }
      return {
        onMouseenter: () => handleMouseEvent(true),
        onMouseleave: () => handleMouseEvent(false),
      }
    })

    return () => (
      <ul class={classes.value} {...events.value}>
        {slots.default?.()}
      </ul>
    )
  },
})
