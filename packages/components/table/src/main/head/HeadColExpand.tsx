import type { TableHeadColExpandProps } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { tableToken } from '../../token'
import { tableHeadColExpandProps } from '../../types'

export default defineComponent({
  props: tableHeadColExpandProps,
  setup(props) {
    const { headColTag } = inject(tableToken)!
    const classes = useClasses(props)

    return () => {
      const { additional } = props
      const HeadColTag = headColTag.value as any
      return <HeadColTag class={classes.value} {...additional}></HeadColTag>
    }
  },
})

function useClasses(props: TableHeadColExpandProps) {
  return computed(() => {
    const { align } = props
    const prefixCls = 'ix-table-th'
    return {
      [prefixCls]: true,
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-expand`]: true,
    }
  })
}
