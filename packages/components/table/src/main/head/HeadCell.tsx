import type { Slots, VNodeTypes } from 'vue'
import type { TableHeadCellProps } from '../../types'

import { defineComponent, inject } from 'vue'
import { isFunction, isString } from 'lodash-es'
import { tableToken } from '../../token'
import { tableHeadCellProps } from '../../types'
import { getColTitle } from '../../utils'
import HeadCellSelectable from './HeadCellSelectable'

export default defineComponent({
  props: tableHeadCellProps,
  setup(props) {
    const { slots, headColTag } = inject(tableToken)!

    return () => {
      const { type, title, ellipsis, additional } = props
      let _title: string | undefined
      let children: VNodeTypes | undefined
      if (type === 'expandable' || type === 'scroll-bar') {
        children = undefined
      } else if (type === 'selectable') {
        children = <HeadCellSelectable></HeadCellSelectable>
      } else {
        children = renderChildren(props, slots)
        _title = getColTitle(ellipsis, children!, title)
        if (ellipsis) {
          children = <span class="ix-table-cell-title">{children}</span>
        }
      }

      const HeadColTag = headColTag.value as any
      return (
        <HeadColTag title={_title} {...additional}>
          {children}
        </HeadColTag>
      )
    }
  },
})

function renderChildren(props: TableHeadCellProps, slots: Slots) {
  const { title, customTitle } = props
  let children: VNodeTypes | undefined = title
  if (isFunction(customTitle)) {
    children = customTitle({ title })
  } else if (isString(customTitle) && slots[customTitle]) {
    children = slots[customTitle]!({ title })
  }
  return children
}
