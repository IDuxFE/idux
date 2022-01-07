/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type StyleValue,
  type VNodeTypes,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
  watchEffect,
} from 'vue'

import { isNumber } from 'lodash-es'

import { CdkVirtualScroll, type VirtualContentRenderFn, type VirtualItemRenderFn } from '@idux/cdk/scroll'
import { Logger, type VKey, callEmit, convertElement, isVisibleElement, offResize, onResize } from '@idux/cdk/utils'

import { type FlattedData } from '../composables/useDataSource'
import { TABLE_TOKEN, tableBodyToken } from '../token'
import ColGroup from './ColGroup'
import FixedHolder from './FixedHolder'
import StickyScroll from './StickyScroll'
import Body from './body/Body'
import BodyRow from './body/BodyRow'
import Head from './head/Head'
import Foot from './tfoot/Foot'

export default defineComponent({
  setup() {
    const {
      props,
      mergedPrefixCls,
      config,
      changeColumnWidth,
      flattedData,
      isSticky,
      scrollBodyRef,
      handleScroll,
      pingedStart,
      pingedEnd,
      scrollX,
      scrollY,
      scrollHorizontal,
      scrollVertical,
      hasFixed,
      tableLayout,
      tableTag,
    } = inject(TABLE_TOKEN)!

    const mainTableRef = ref<HTMLDivElement>()
    const mainTableWidth = ref(0)

    const _changeColumnWidth = (key: VKey, width: number | false) => {
      if (isVisibleElement(mainTableRef.value)) {
        changeColumnWidth(key, width)
      }
    }

    provide(tableBodyToken, { mainTableWidth, changeColumnWidth: _changeColumnWidth })

    const triggerScroll = () => {
      const currentTarget = convertElement(scrollBodyRef)
      if (currentTarget) {
        handleScroll({ currentTarget } as unknown as Event)
      }
    }

    const handleWrapperResize = (evt: ResizeObserverEntry) => {
      const { offsetWidth } = evt.target as HTMLDivElement
      if (offsetWidth !== mainTableWidth.value) {
        triggerScroll()
        mainTableWidth.value = offsetWidth
      }
    }

    onMounted(() => {
      triggerScroll()

      watch([() => props.dataSource, scrollHorizontal], ([, value]) => {
        if (value) {
          triggerScroll()
        }
      })

      watchEffect(() => {
        const element = mainTableRef.value
        if (scrollHorizontal.value) {
          onResize(element, handleWrapperResize)
        } else {
          offResize(element, handleWrapperResize)
        }
      })
    })

    onBeforeUnmount(() => offResize(mainTableRef.value, handleWrapperResize))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { borderless = config.borderless, size = config.size } = props
      return {
        [`${prefixCls}-container`]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-ping-start`]: pingedStart.value,
        [`${prefixCls}-ping-end`]: pingedEnd.value,
        [`${prefixCls}-fixed-layout`]: tableLayout.value === 'fixed',
        [`${prefixCls}-fixed-column`]: hasFixed.value,
        [`${prefixCls}-scroll-horizontal`]: scrollHorizontal.value,
        [`${prefixCls}-scroll-vertical`]: scrollVertical.value,
      }
    })

    const contentStyle = computed<StyleValue>(() => {
      const x = scrollX.value
      const y = scrollY.value
      const overflowX = x ? 'auto' : undefined
      const overflowY = props.virtual ? 'hidden' : y ? 'scroll' : x ? 'hidden' : undefined
      const maxHeight = y
      return { overflowX, overflowY, maxHeight }
    })

    const tableStyle = computed<StyleValue>(() => {
      return {
        tableLayout: tableLayout.value,
        width: scrollX.value,
        minWidth: scrollX.value ? '100%' : undefined,
      }
    })

    const handleScrolledChange = (startIndex: number, endIndex: number, visibleData: FlattedData[]) => {
      callEmit(
        props.onScrolledChange,
        startIndex,
        endIndex,
        visibleData.map(item => item.record),
      )
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const TableTag = tableTag.value as any
      let children: VNodeTypes

      const prefixCls = mergedPrefixCls.value

      if (scrollVertical.value || isSticky.value) {
        const tableHead = props.headless ? null : (
          <FixedHolder>
            <Head></Head>
          </FixedHolder>
        )

        let tableBody: VNodeTypes
        if (props.virtual) {
          const itemRender: VirtualItemRenderFn<FlattedData> = ({ item, index }) => {
            const { expanded, level, record, rowKey } = item
            const rowProps = { key: rowKey, expanded, level, record, rowData: item, rowIndex: index, rowKey }
            return <BodyRow {...rowProps} />
          }
          const contentRender: VirtualContentRenderFn = children => {
            return (
              <TableTag style={tableStyle.value}>
                <ColGroup></ColGroup>
                <Body>{children}</Body>
                <Foot></Foot>
              </TableTag>
            )
          }
          const { scroll, onScrolledBottom } = props
          const height = scroll?.y

          __DEV__ &&
            !isNumber(height) &&
            Logger.warn('components/table', 'scroll.y must is a valid number when enable virtual scroll')

          tableBody = (
            <CdkVirtualScroll
              ref={scrollBodyRef}
              style={contentStyle.value}
              dataSource={flattedData.value}
              fullHeight
              height={height as number}
              itemHeight={44}
              itemKey="rowKey"
              itemRender={itemRender}
              contentRender={contentRender}
              virtual
              onScroll={handleScroll}
              onScrolledBottom={onScrolledBottom}
              onScrolledChange={handleScrolledChange}
            />
          )
        } else {
          tableBody = (
            <div ref={scrollBodyRef} class={`${prefixCls}-content`} style={contentStyle.value} onScroll={handleScroll}>
              <TableTag style={tableStyle.value}>
                <ColGroup></ColGroup>
                <Body></Body>
                <Foot></Foot>
              </TableTag>
            </div>
          )
        }

        // TODO
        const tableFoot = null
        const sticky = isSticky.value ? <StickyScroll></StickyScroll> : null

        children = [tableHead, tableBody, tableFoot, sticky]
      } else {
        children = (
          <div ref={scrollBodyRef} class={`${prefixCls}-content`} style={contentStyle.value} onScroll={handleScroll}>
            <TableTag style={tableStyle.value}>
              <ColGroup></ColGroup>
              {props.headless ? null : <Head></Head>}
              <Body></Body>
              <Foot></Foot>
            </TableTag>
          </div>
        )
      }

      return (
        <div ref={mainTableRef} class={classes.value}>
          {children}
        </div>
      )
    }
  },
})
