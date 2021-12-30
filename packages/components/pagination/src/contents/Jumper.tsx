/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { ɵInput } from '@idux/components/_private/input'

import { paginationToken } from '../token'

export default defineComponent({
  setup() {
    const { props, locale, mergedPrefixCls, size, jumpToIndex } = inject(paginationToken)!

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-jumper`
      const { disabled } = props
      const { jumpTo, page } = locale.value
      return (
        <li class={prefixCls}>
          {jumpTo}
          <ɵInput disabled={disabled} size={size.value} onKeydown={jumpToIndex} />
          {page}
        </li>
      )
    }
  },
})
