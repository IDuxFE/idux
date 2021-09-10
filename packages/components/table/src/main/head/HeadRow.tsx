import { defineComponent, inject } from 'vue'

import { TABLE_TOKEN } from '../../token'
import { tableHeadRowProps } from '../../types'
import HeadCell from './HeadCell'

export default defineComponent({
  props: tableHeadRowProps,
  setup(props) {
    const { headRowTag } = inject(TABLE_TOKEN)!
    return () => {
      const children = props.columns
        .filter(column => column.titleColSpan !== 0)
        .map(column => <HeadCell key={column.key} column={column}></HeadCell>)
      const HeadRowTag = headRowTag.value as any
      return <HeadRowTag>{children}</HeadRowTag>
    }
  },
})
