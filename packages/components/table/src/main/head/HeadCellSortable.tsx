import { defineComponent, inject } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { TableLocale } from '@idux/components/i18n'
import { TableColumnSortOrder } from '@idux/components/table'
import { IxTooltip } from '@idux/components/tooltip'
import { tableToken } from '../../token'

export default defineComponent({
  props: ['activeOrderBy', 'sortable'],
  setup(props, { slots }) {
    const { locale } = inject(tableToken)!

    return () => {
      const { activeOrderBy, sortable } = props
      const { orders, nextTooltip } = sortable
      const title = nextTooltip ? getNextTooltipTitle(locale.value, orders!, activeOrderBy) : undefined
      const sortableNode = (
        <span class="ix-table-sortable">
          {slots.default!()}
          {renderSortTrigger(orders!, activeOrderBy)}
        </span>
      )
      return title ? <IxTooltip title={title}>{sortableNode}</IxTooltip> : sortableNode
    }
  },
})

function getNextTooltipTitle(
  locale: TableLocale,
  orders: TableColumnSortOrder[],
  activeOrderBy?: TableColumnSortOrder,
) {
  const nextOrderBy = activeOrderBy ? orders[orders.indexOf(activeOrderBy) + 1] : orders[0]
  const { sortCancel, sortAsc, sortDesc } = locale
  if (!nextOrderBy) {
    return sortCancel
  }
  return nextOrderBy === 'ascend' ? sortAsc : sortDesc
}

function renderSortTrigger(orders: TableColumnSortOrder[], activeOrderBy?: TableColumnSortOrder) {
  const upNode = orders!.includes('ascend') ? (
    <IxIcon name="caret-up" class={{ 'ix-table-sortable-trigger-active': activeOrderBy === 'ascend' }} />
  ) : undefined
  const downNode = orders!.includes('descend') ? (
    <IxIcon name="caret-down" class={{ 'ix-table-sortable-trigger-active': activeOrderBy === 'descend' }} />
  ) : undefined
  return (
    <span class="ix-table-sortable-trigger">
      {upNode}
      {downNode}
    </span>
  )
}
