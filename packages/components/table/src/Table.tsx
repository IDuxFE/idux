import type { TableProps } from './types'

import { computed, defineComponent, provide } from 'vue'
import { isBoolean } from 'lodash-es'
import { useGlobalConfig } from '@idux/components/config'
import { IxSpin } from '@idux/components/spin'
import { useTags } from './composables/useTags'
import { useColumns } from './composables/useColumns'
import { usePagination } from './composables/usePagination'
import { useExpandable } from './composables/useExpandable'
import { useSelectable } from './composables/useSelectable'
import { useGetRowKey } from './composables/useGetRowKey'
import { useDataSource } from './composables/useDataSource'
import { tableToken } from './token'
import { tableProps } from './types'
import MainTable from './main/MainTable'
import { renderPagination } from './other/Pagination'

export default defineComponent({
  name: 'IxTable',
  props: tableProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('table')
    const tags = useTags(props)
    const getRowKey = useGetRowKey(props, config)
    const columnsContext = useColumns(props, config)
    const { mergedPagination } = usePagination(props, config)
    const expandableContext = useExpandable(props, columnsContext.flattedColumns)
    const dataContext = useDataSource(props, getRowKey, expandableContext, mergedPagination)
    const selectableContext = useSelectable(props, columnsContext.flattedColumns, dataContext)

    provide(tableToken, {
      props,
      slots,
      config,
      ...tags,
      getRowKey,
      ...columnsContext,
      mergedPagination,
      ...expandableContext,
      ...dataContext,
      ...selectableContext,
    })

    const spinProps = useSpinProps(props)

    return () => {
      const [paginationTop, paginationBottom] = renderPagination(mergedPagination.value, dataContext.filteredData.value)
      const children = [paginationTop, <MainTable />, paginationBottom]
      const _spinProps = spinProps.value
      const spinWrapper = _spinProps ? <IxSpin {..._spinProps}>{children}</IxSpin> : children
      return <div class="ix-table">{spinWrapper}</div>
    }
  },
})

function useSpinProps(props: TableProps) {
  return computed(() => {
    const { spin } = props
    return isBoolean(spin) ? { spinning: spin } : spin
  })
}
