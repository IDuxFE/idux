import { defineComponent, inject } from 'vue'
import { tableToken } from '../../token'
import HeadRow from './HeadRow'

export default defineComponent({
  setup() {
    const { mergedRows, headTag } = inject(tableToken)!

    return () => {
      const children = mergedRows.value.map((columns, index) => <HeadRow key={index} columns={columns} />)
      const HeadTag = headTag.value as any
      return <HeadTag class="ix-table-thead">{children}</HeadTag>
    }
  },
})
