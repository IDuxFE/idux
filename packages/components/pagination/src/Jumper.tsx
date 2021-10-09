/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxInput } from '@idux/components/input'

import { paginationToken } from './token'
import { useJumpToIndex } from './utils'

export default defineComponent({
  setup() {
    const { props, config, locale } = inject(paginationToken)!
    const size = computed(() => props.size ?? config.size)
    const jumpToIndex = useJumpToIndex(true)

    return () => {
      const { disabled } = props
      const { jumpTo, page } = locale.value
      return (
        <li class="ix-pagination-jumper">
          {jumpTo}
          <IxInput disabled={disabled} size={size.value} onKeydown={jumpToIndex} />
          {page}
        </li>
      )
    }
  },
})
