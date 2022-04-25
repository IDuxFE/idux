/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type CSSProperties,
  type VNodeTypes,
  computed,
  defineComponent,
  inject,
  normalizeClass,
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
import { renderBodyRow } from './body/RenderBodyRow'
import Head from './head/Head'
import Foot from './tfoot/Foot'

export default defineComponent({
  setup() {
    const {
      props,
      slots,
      expandable,
      mergedPrefixCls,
      changeColumnWidth,
      flattedData,
      isSticky,
      scrollBodyRef,
      handleScroll,
      pingedStart,
      pingedEnd,
      scrollWidth,
      scrollHeight,
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

      watch([() => props.dataSource, scrollWidth], ([, width]) => {
        if (width) {
          triggerScroll()
        }
      })

      watchEffect(() => {
        const element = mainTableRef.value
        if (scrollWidth.value) {
          onResize(element, handleWrapperResize)
        } else {
          offResize(element, handleWrapperResize)
        }
      })
    })

    onBeforeUnmount(() => offResize(mainTableRef.value, handleWrapperResize))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-container`]: true,
        [`${prefixCls}-ping-start`]: pingedStart.value,
        [`${prefixCls}-ping-end`]: pingedEnd.value,
        [`${prefixCls}-fixed-layout`]: tableLayout.value === 'fixed',
        [`${prefixCls}-fixed-column`]: hasFixed.value,
        [`${prefixCls}-scroll-horizontal`]: scrollWidth.value,
        [`${prefixCls}-scroll-vertical`]: scrollHeight.value,
      })
    })

    const contentStyle = computed<CSSProperties>(() => {
      const width = scrollWidth.value
      const height = scrollHeight.value
      const overflowX = width ? 'auto' : undefined
      const overflowY = props.virtual ? 'hidden' : height ? 'auto' : width ? 'hidden' : undefined
      const fullHeight = props.scroll?.fullHeight
      return { overflowX, overflowY, [fullHeight ? 'height' : 'maxHeight']: height }
    })

    const tableStyle = computed<CSSProperties>(() => {
      return {
        tableLayout: tableLayout.value,
        width: scrollWidth.value,
        minWidth: scrollWidth.value ? '100%' : undefined,
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

      if (scrollHeight.value || isSticky.value) {
        const tableHead = !props.headless && (
          <FixedHolder>
            <Head></Head>
          </FixedHolder>
        )

        let tableBody: VNodeTypes
        if (props.virtual && props.scroll) {
          const itemRender: VirtualItemRenderFn<FlattedData> = ({ item, index }) =>
            renderBodyRow(item, index, slots, expandable.value)

          const contentRender: VirtualContentRenderFn = children => {
            return (
              <TableTag style={tableStyle.value}>
                <ColGroup></ColGroup>
                <Body>{children}</Body>
                {false && <Foot></Foot>}
              </TableTag>
            )
          }
          const { scroll, onScrolledBottom } = props
          const { height, y, fullHeight } = scroll

          __DEV__ &&
            !isNumber(height || y) &&
            Logger.warn('components/table', '`scroll.height` must is a valid number when enable virtual scroll')

          tableBody = (
            <CdkVirtualScroll
              ref={scrollBodyRef}
              style={contentStyle.value}
              dataSource={flattedData.value}
              fullHeight={fullHeight}
              getKey="rowKey"
              height={(height || y) as number}
              itemHeight={47}
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
                {false && <Foot></Foot>}
              </TableTag>
            </div>
          )
        }

        const sticky = isSticky.value ? <StickyScroll></StickyScroll> : null

        children = [tableHead, tableBody, sticky]
      } else {
        children = (
          <div ref={scrollBodyRef} class={`${prefixCls}-content`} style={contentStyle.value} onScroll={handleScroll}>
            <TableTag style={tableStyle.value}>
              <ColGroup></ColGroup>
              {!props.headless && <Head></Head>}
              <Body></Body>
              {false && <Foot></Foot>}
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
