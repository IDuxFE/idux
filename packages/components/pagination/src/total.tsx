import type { PaginationTotalProps } from './types'

import { computed, defineComponent } from 'vue'
import { paginationTotalDef } from './types'

export default defineComponent({
  name: 'IxPaginationTotal',
  props: paginationTotalDef,
  setup(props: PaginationTotalProps) {
    const range = computed(() => {
      const { pageIndex, pageSize, total } = props
      const firstIndex = (pageIndex - 1) * pageSize + 1
      const lastIndex = Math.min(pageIndex * pageSize, total)
      return [firstIndex, lastIndex]
    })

    return { range }
  },
  render() {
    const { total, range, locale } = this
    const { totalPrefix, totalSuffix } = locale
    const totalRender = this.$slots.total ?? this.totalRender
    const child = totalRender ? totalRender({ total, range }) : `${totalPrefix} ${total} ${totalSuffix}`
    return <li class="ix-pagination-total">{child}</li>
  },
})
