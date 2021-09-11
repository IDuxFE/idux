import { defineComponent, inject } from 'vue'
import { TABLE_TOKEN } from '../../token'
import HeadRow from './HeadRow'

export default defineComponent({
  setup() {
    const { mergedRows, headTag } = inject(TABLE_TOKEN)!

    return () => {
      const children = mergedRows.value.map((columns, rowIndex) => <HeadRow key={rowIndex} columns={columns} />)
      const HeadTag = headTag.value as any
      return <HeadTag>{children}</HeadTag>
    }
  },
})
