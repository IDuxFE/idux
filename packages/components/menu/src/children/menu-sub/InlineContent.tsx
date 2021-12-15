/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { ɵCollapseTransition } from '@idux/components/_private/collapse-transition'

import { menuSubToken, menuToken } from '../../token'
import { coverChildren } from '../Utils'

export default defineComponent({
  setup() {
    const { mergedPrefixCls } = inject(menuToken)!
    const { props, isExpanded } = inject(menuSubToken)!

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-inline`]: true,
      })
    })

    return () => {
      return (
        <ɵCollapseTransition appear>
          <ul v-show={isExpanded.value} class={classes.value}>
            {coverChildren(props.children)}
          </ul>
        </ɵCollapseTransition>
      )
    }
  },
})
