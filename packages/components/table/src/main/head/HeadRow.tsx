import { defineComponent, inject } from 'vue'

import { tableToken } from '../../token'
import { tableHeadRowProps } from '../../types'
import HeadCell from './HeadCell'

export default defineComponent({
  props: tableHeadRowProps,
  setup(props) {
    const { headRowTag } = inject(tableToken)!
    return () => {
      const children = props.columns.map(column => <HeadCell key={column.key} column={column}></HeadCell>)
      const HeadRowTag = headRowTag.value as any
      return <HeadRowTag>{children}</HeadRowTag>
    }
  },
})
