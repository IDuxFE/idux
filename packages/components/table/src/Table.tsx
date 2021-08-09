import type { TableProps } from './types'

import { computed, defineComponent, provide } from 'vue'
import { isBoolean } from 'lodash-es'
import { useGlobalConfig } from '@idux/components/config'
import { IxSpin } from '@idux/components/spin'
import MainTable from './main/MainTable'
import { renderPagination } from './pagination/Index'
import { tableProps } from './types'
import { tableToken } from './token'
import { useTags } from './composables/useTags'
import { useColumns } from './composables/useColumns'
import { usePagination } from './composables/usePagination'
import { useExpandable } from './composables/useExpandable'
import { useGetRowKey } from './composables/useGetRowKey'
import { useDataSource } from './composables/useDataSource'

export default defineComponent({
  name: 'IxTable',
  props: tableProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('table')
    const tags = useTags(props)
    const { mergedColumns, flattedColumns } = useColumns(props, config)
    const { mergedPagination } = usePagination(props, config)
    const { expandable, expandedRowKeys, handleExpandChange } = useExpandable(props, flattedColumns)
    const getRowKey = useGetRowKey(props, config)
    const { filteredData, flattedDataSource } = useDataSource(props, getRowKey, expandedRowKeys, mergedPagination)

    provide(tableToken, {
      props,
      slots,
      config,
      ...tags,
      mergedColumns,
      flattedColumns,
      mergedPagination,
      expandable,
      expandedRowKeys,
      handleExpandChange,
      getRowKey,
      filteredData,
      flattedDataSource,
    })

    const spinProps = useSpinProps(props)

    return () => {
      const [paginationTop, paginationBottom] = renderPagination(mergedPagination.value, filteredData.value)
      const children = [paginationTop, <MainTable />, paginationBottom]
      const spinWrapper = spinProps.value ? <IxSpin {...spinProps.value}>{children}</IxSpin> : children
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
