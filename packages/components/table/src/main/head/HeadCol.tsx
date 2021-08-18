import type { Slots, VNodeTypes } from 'vue'
import type { TableHeadColProps } from '../../types'

import { computed, defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { tableToken } from '../../token'
import { tableHeadColProps } from '../../types'
import { getColTitle } from '../../utils'

export default defineComponent({
  props: tableHeadColProps,
  setup(props) {
    const { headColTag, slots } = inject(tableToken)!

    const classes = useClasses(props)

    return () => {
      const { title, ellipsis, colSpan, rowSpan, additional } = props
      const children = renderChildren(props, slots)
      const _title = getColTitle(children!, title, ellipsis)
      const mergedProps = {
        title: _title,
        colSpan: colSpan === 1 ? undefined : colSpan,
        rowSpan: rowSpan === 1 ? undefined : rowSpan,
        class: classes.value,
      }

      const HeadColTag = headColTag.value as any
      return (
        <HeadColTag {...mergedProps} {...additional}>
          <span class="ix-table-th-content">{children}</span>
        </HeadColTag>
      )
    }
  },
})

function useClasses(props: TableHeadColProps) {
  return computed(() => {
    const { align, ellipsis } = props
    const prefixCls = 'ix-table-th'
    return {
      [prefixCls]: true,
      [`${prefixCls}-align-${align}`]: true,
      [`${prefixCls}-ellipsis`]: ellipsis,
    }
  })
}

function renderChildren(props: TableHeadColProps, slots: Slots) {
  const { title, customTitle } = props
  let children: VNodeTypes | undefined = title
  if (isFunction(customTitle)) {
    children = customTitle({ title })
  } else if (isString(customTitle) && slots[customTitle]) {
    children = slots[customTitle]!({ title })
  }

  return children
}
