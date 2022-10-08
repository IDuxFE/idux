/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpinProps } from '@idux/components/spin'

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { isBoolean } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'
import { ɵHeader } from '@idux/components/_private/header'
import { useGlobalConfig } from '@idux/components/config'
import { IxSpin } from '@idux/components/spin'

import { useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useExpandable } from './composables/useExpandable'
import { useFilterable } from './composables/useFilterable'
import { useGetRowKey } from './composables/useGetRowKey'
import { usePagination } from './composables/usePagination'
import { useScroll } from './composables/useScroll'
import { useScrollOnChange } from './composables/useScrollOnChange'
import { useSelectable } from './composables/useSelectable'
import { useSortable } from './composables/useSortable'
import { useSticky } from './composables/useSticky'
import { useTableLayout } from './composables/useTableLayout'
import MainTable from './main/MainTable'
import { renderFooter } from './other/Footer'
import { renderPagination } from './other/Pagination'
import { TABLE_TOKEN } from './token'
import { tableProps } from './types'

export default defineComponent({
  name: 'IxTable',
  props: tableProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-table`)
    const locale = useGlobalConfig('locale')
    const config = useGlobalConfig('table')

    const mergedAutoHeight = computed(() => props.autoHeight ?? config.autoHeight)
    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedGetKey = useGetRowKey(props, config)
    const mergedEmptyCell = computed(() => props.emptyCell ?? config.emptyCell)
    const mergedSize = computed(() => props.size ?? config.size)
    const { mergedPagination } = usePagination(props, config, mergedSize)

    const stickyContext = useSticky(props)
    const scrollContext = useScroll(props, mergedAutoHeight, stickyContext)
    const columnsContext = useColumns(props, slots, config, scrollContext.scrollBarSizeOnFixedHolder)
    const sortableContext = useSortable(columnsContext.flattedColumns)
    const filterableContext = useFilterable(columnsContext.flattedColumns)
    const expandableContext = useExpandable(props, columnsContext.flattedColumns)
    const tableLayout = useTableLayout(props, columnsContext, scrollContext, stickyContext.isSticky)

    const { activeSorters } = sortableContext
    const { activeFilters } = filterableContext

    const dataContext = useDataSource(
      props,
      mergedChildrenKey,
      mergedGetKey,
      activeSorters,
      activeFilters,
      expandableContext.expandedRowKeys,
      mergedPagination,
    )
    const selectableContext = useSelectable(props, locale, columnsContext.flattedColumns, dataContext)

    useScrollOnChange(props, config, mergedPagination, activeSorters, activeFilters, scrollContext.scrollTo)

    const context = {
      props,
      slots,
      config,
      locale,
      mergedPrefixCls,
      mergedEmptyCell,
      mergedSize,
      mergedAutoHeight,
      ...columnsContext,
      ...scrollContext,
      ...sortableContext,
      ...filterableContext,
      ...stickyContext,
      tableLayout,
      mergedPagination,
      ...expandableContext,
      ...dataContext,
      ...selectableContext,
    }

    provide(TABLE_TOKEN, context)
    expose({ scrollTo: scrollContext.scrollTo })

    const { flattedData, filteredData } = dataContext

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { borderless = config.borderless, scroll } = props
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-auto-height`]: mergedAutoHeight.value,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-empty`]: flattedData.value.length === 0,
        [`${prefixCls}-full-height`]: scroll?.fullHeight,
        [`${prefixCls}-${mergedSize.value}`]: true,
      })
    })

    if (__DEV__) {
      if (props.rowClassName) {
        Logger.warn('components/table', 'the `rowClassName` was deprecated, please use `customAdditional` instead.')
      }
      if (props.rowKey) {
        Logger.warn('components/table', 'the `rowKey` was deprecated, please use `getKey` instead.')
      }
      if (props.scroll?.x) {
        Logger.warn('components/table', 'the `scroll.x` was deprecated, please use `scroll.width` instead.')
      }
      if (props.scroll?.y) {
        Logger.warn('components/table', 'the `scroll.y` was deprecated, please use `scroll.height` instead.')
      }
      if (props.columns.some(col => !!col.additional)) {
        Logger.warn(
          'components/table',
          'the `additional` of TableColumn was deprecated, please use `customAdditional` instead.',
        )
      }
      if (props.columns.some(col => !!col.customRender)) {
        Logger.warn(
          'components/table',
          'the `customRender` of TableColumn was deprecated, please use `customCell` instead.',
        )
      }
      if (props.columns.some(col => !!col.responsive)) {
        Logger.warn('components/table', 'the `responsive` of TableColumn was deprecated.')
      }
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const header = <ɵHeader v-slots={slots} header={props.header} />
      const footer = renderFooter(slots, prefixCls)
      const [paginationTop, paginationBottom] = renderPagination(mergedPagination.value, filteredData.value, prefixCls)
      const children = [header, paginationTop, <MainTable />, footer, paginationBottom]
      const spinProps = convertSpinProps(props.spin)
      const spinWrapper = spinProps ? <IxSpin {...spinProps}>{children}</IxSpin> : children
      return <div class={classes.value}>{spinWrapper}</div>
    }
  },
})

function convertSpinProps(spin: boolean | SpinProps | undefined) {
  return isBoolean(spin) ? { spinning: spin } : spin
}
