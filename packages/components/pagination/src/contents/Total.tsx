/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { paginationToken } from '../token'

export default defineComponent({
  setup() {
    const { props, slots, locale, activeIndex, activeSize, mergedPrefixCls } = inject(paginationToken)!

    const range = computed(() => {
      const currIndex = activeIndex.value
      const currSize = activeSize.value
      const firstIndex = (currIndex - 1) * currSize + 1
      const lastIndex = Math.min(currIndex * currSize, props.total)
      return [firstIndex, lastIndex] as [number, number]
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-total`
      const { total } = props
      const { totalPrefix, totalSuffix } = locale.pagination

      const children = slots.total
        ? slots.total({ total, range: range.value, prefix: totalPrefix, suffix: totalSuffix })
        : `${totalPrefix} ${total} ${totalSuffix}`
      return <li class={prefixCls}>{children}</li>
    }
  },
})
