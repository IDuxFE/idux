/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpinProps } from '@idux/components/spin'

import { defineComponent, provide } from 'vue'

import { isBoolean } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'
import { getLocale } from '@idux/components/i18n'
import { IxSpin } from '@idux/components/spin'

import { useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useExpandable } from './composables/useExpandable'
import { useGetRowKey } from './composables/useGetRowKey'
import { usePagination } from './composables/usePagination'
import { useScroll } from './composables/useScroll'
import { useSelectable } from './composables/useSelectable'
import { useSortable } from './composables/useSortable'
import { useSticky } from './composables/useSticky'
import { useTableLayout } from './composables/useTableLayout'
import { useTags } from './composables/useTags'
import MainTable from './main/MainTable'
import { renderFooter } from './other/Footer'
import { renderHeader } from './other/Header'
import { renderPagination } from './other/Pagination'
import { TABLE_TOKEN } from './token'
import { tableProps } from './types'

export default defineComponent({
  name: 'IxTable',
  props: tableProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('table')
    const locale = getLocale('table')
    const tags = useTags(props)
    const getRowKey = useGetRowKey(props, config)
    const stickyContext = useSticky(props)
    const scrollContext = useScroll(props, stickyContext)
    const columnsContext = useColumns(props, config, scrollContext.scrollBarSizeOnFixedHolder)
    const sortableContext = useSortable(columnsContext.flattedColumns)
    const tableLayout = useTableLayout(props, columnsContext, scrollContext, stickyContext.isSticky)
    const { mergedPagination } = usePagination(props, config)
    const expandableContext = useExpandable(props, columnsContext.flattedColumns)
    const dataContext = useDataSource(
      props,
      getRowKey,
      sortableContext.activeSortable,
      expandableContext.expandedRowKeys,
      mergedPagination,
    )
    const selectableContext = useSelectable(props, locale, columnsContext.flattedColumns, dataContext)

    const context = {
      props,
      slots,
      config,
      locale,
      ...tags,
      getRowKey,
      ...columnsContext,
      ...scrollContext,
      ...sortableContext,
      ...stickyContext,
      tableLayout,
      mergedPagination,
      ...expandableContext,
      ...dataContext,
      ...selectableContext,
    }

    provide(TABLE_TOKEN, context)

    return () => {
      const header = renderHeader(props, slots)
      const footer = renderFooter(slots)
      const [paginationTop, paginationBottom] = renderPagination(mergedPagination.value, dataContext.filteredData.value)
      const children = [header, paginationTop, <MainTable />, paginationBottom, footer]
      const spinProps = covertSpinProps(props.spin)
      const spinWrapper = spinProps ? <IxSpin {...spinProps}>{children}</IxSpin> : children
      return <div class="ix-table">{spinWrapper}</div>
    }
  },
})

function covertSpinProps(spin: boolean | SpinProps | undefined) {
  return isBoolean(spin) ? { spinning: spin } : spin
}
