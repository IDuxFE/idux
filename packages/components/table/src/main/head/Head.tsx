import { defineComponent, inject } from 'vue'
import { tableToken } from '../../token'
import HeadRow from './HeadRow'

export default defineComponent({
  setup() {
    const { mergedColumns, headTag } = inject(tableToken)!

    return () => {
      const children = mergedColumns.value.map((cols, index) => <HeadRow key={index} cols={cols} />)
      const HeadTag = headTag.value as any
      return <HeadTag class="ix-table-thead">{children}</HeadTag>
    }
  },
})
