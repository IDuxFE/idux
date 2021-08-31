import type { ComputedRef } from 'vue'
import type { TableColumnMergedExpandable } from '../../composables/useColumns'

import { computed, defineComponent, inject } from 'vue'
import { tableToken } from '../../token'

export default defineComponent({
  setup() {
    const { headColTag, expandable } = inject(tableToken)!
    const classes = useClasses(expandable)

    return () => {
      const { additional } = expandable.value!
      const HeadColTag = headColTag.value as any
      return <HeadColTag class={classes.value} {...additional}></HeadColTag>
    }
  },
})

function useClasses(expandable: ComputedRef<TableColumnMergedExpandable | undefined>) {
  return computed(() => {
    const { align } = expandable.value!
    const prefixCls = 'ix-table'
    return {
      [`${prefixCls}-cell`]: true,
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-expandable`]: true,
    }
  })
}
