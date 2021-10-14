/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxCollapseTransition } from '@idux/components/_private'

import { menuSubToken } from '../token'

export default defineComponent({
  setup() {
    const { slots, isExpanded } = inject(menuSubToken)!

    const classes = computed(() => {
      return {
        'ix-menu-content': true,
        'ix-menu-inline': true,
      }
    })

    return () => (
      <IxCollapseTransition appear>
        <ul v-show={isExpanded.value} class={classes.value}>
          {slots.default?.()}
        </ul>
      </IxCollapseTransition>
    )
  },
})
