/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TableColumnSortOrder } from '@idux/components/table'
import type { ComputedRef } from 'vue'

import { defineComponent, inject } from 'vue'

import { TableLocale } from '@idux/components/i18n'
import { IxIcon } from '@idux/components/icon'
import { IxTooltip } from '@idux/components/tooltip'

import { TABLE_TOKEN } from '../../token'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['activeOrderBy', 'sortable'],
  setup(props) {
    const { locale, mergedPrefixCls } = inject(TABLE_TOKEN)!

    return () => {
      const { activeOrderBy, sortable } = props
      const { orders, nextTooltip } = sortable
      const title = nextTooltip ? getNextTooltipTitle(locale.value, orders!, activeOrderBy) : undefined
      const sortableTriggerNode = renderSortTrigger(mergedPrefixCls, orders!, activeOrderBy)
      return title ? <IxTooltip title={title}>{sortableTriggerNode}</IxTooltip> : sortableTriggerNode
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

function renderSortTrigger(
  mergedPrefixCls: ComputedRef<string>,
  orders: TableColumnSortOrder[],
  activeOrderBy?: TableColumnSortOrder,
) {
  const prefixCls = mergedPrefixCls.value

  const upNode = orders!.includes('ascend') ? (
    <IxIcon name="caret-up-filled" class={{ [`${prefixCls}-sortable-trigger-active`]: activeOrderBy === 'ascend' }} />
  ) : undefined
  const downNode = orders!.includes('descend') ? (
    <IxIcon
      name="caret-down-filled"
      class={{ [`${prefixCls}-sortable-trigger-active`]: activeOrderBy === 'descend' }}
    />
  ) : undefined
  return (
    <span class={`${prefixCls}-sortable-trigger`}>
      {upNode}
      {downNode}
    </span>
  )
}
