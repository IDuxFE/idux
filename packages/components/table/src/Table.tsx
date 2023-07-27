/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNode, computed, defineComponent, normalizeClass, provide } from 'vue'

import { isBoolean } from 'lodash-es'

import { ɵHeader } from '@idux/components/_private/header'
import { useGlobalConfig } from '@idux/components/config'
import { IxSpin, type SpinProps } from '@idux/components/spin'
import { useGetKey } from '@idux/components/utils'

import { useColumns } from './composables/useColumns'
import { useDataSource } from './composables/useDataSource'
import { useExpandable } from './composables/useExpandable'
import { useFilterable } from './composables/useFilterable'
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

const virtualItemHeightForSeer = { sm: 32, md: 40, lg: 56 } as const
const virtualItemHeightForDefault = { sm: 40, md: 48, lg: 56 } as const

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
    const mergedGetKey = useGetKey(props, config, 'components/table')
    const mergedEmptyCell = computed(() => props.emptyCell ?? config.emptyCell)
    const mergedSize = computed(() => props.size ?? config.size)
    const mergedVirtualItemHeight = computed(
      () =>
        props.virtualItemHeight ??
        (common.theme === 'seer'
          ? virtualItemHeightForSeer[mergedSize.value]
          : virtualItemHeightForDefault[mergedSize.value]),
    )
    const { mergedPagination } = usePagination(props, config, mergedSize)

    const stickyContext = useSticky(props)
    const scrollContext = useScroll(props, mergedAutoHeight, stickyContext)
    const columnsContext = useColumns(props, slots, config, scrollContext.scrollBarSizeOnFixedHolder)
    const sortableContext = useSortable(columnsContext.flattedColumns)
    const filterableContext = useFilterable(columnsContext.flattedColumns)
    const expandableContext = useExpandable(props, columnsContext.flattedColumns)
    const tableLayout = useTableLayout(props, columnsContext, scrollContext, stickyContext.isSticky, mergedAutoHeight)

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
      mergedVirtualItemHeight,
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

    return () => {
      const prefixCls = mergedPrefixCls.value
      const header = <ɵHeader v-slots={slots} header={props.header} />
      const footer = renderFooter(slots, prefixCls)
      const [paginationTop, paginationBottom] = renderPagination(mergedPagination.value, filteredData.value, prefixCls)
      const children = [header]
      const resetChildren = [paginationTop, <MainTable />, footer, paginationBottom].filter(Boolean) as VNode[]
      const spinProps = convertSpinProps(props.spin)
      if (spinProps) {
        children.push(<IxSpin {...spinProps}>{resetChildren}</IxSpin>)
      } else {
        children.push(...resetChildren)
      }
      return <div class={classes.value}>{children}</div>
    }
  },
})

function convertSpinProps(spin: boolean | SpinProps | undefined) {
  return isBoolean(spin) ? { spinning: spin } : spin
}
