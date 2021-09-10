import type { StyleValue, VNodeTypes } from 'vue'
import type { VirtualContentRenderFn, VirtualItemRenderFn } from '@idux/cdk/scroll'
import type { FlattedData } from '../composables/useDataSource'
import type { Key } from '../types'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { IxVirtualScroll } from '@idux/cdk/scroll'
import { convertElement, isVisibleElement, offResize, onResize } from '@idux/cdk/utils'
import { tableBodyToken, TABLE_TOKEN } from '../token'
import ColGroup from './ColGroup'
import Head from './head/Head'
import Body from './body/Body'
import BodyRow from './body/BodyRow'
import Foot from './tfoot/Foot'
import FixedHolder from './FixedHolder'
import StickyScroll from './StickyScroll'

export default defineComponent({
  setup() {
    const {
      props,
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

    const _changeColumnWidth = (key: Key, width: number | false) => {
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
      const prefixCls = 'ix-table'
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
      const overflowY = props.useVirtual ? 'hidden' : y ? 'scroll' : x ? 'hidden' : undefined
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

    return () => {
      const TableTag = tableTag.value as any
      let children: VNodeTypes

      if (scrollVertical.value || isSticky.value) {
        const tableHead = props.headless ? null : (
          <FixedHolder>
            <Head></Head>
          </FixedHolder>
        )

        let tableBody: VNodeTypes
        if (props.useVirtual) {
          const itemRender: VirtualItemRenderFn<FlattedData> = ({ item, index }) => {
            const { expanded, level, record, rowKey } = item
            const rowProps = { key: rowKey, expanded, level, record, rowIndex: index, rowKey }
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
          tableBody = (
            <IxVirtualScroll
              ref={scrollBodyRef}
              style={contentStyle.value}
              data={flattedData.value}
              height={props.scroll?.y}
              itemHeight={44}
              itemKey="rowKey"
              itemRender={itemRender}
              contentRender={contentRender}
              onScroll={handleScroll}
            />
          )
        } else {
          tableBody = (
            <div ref={scrollBodyRef} style={contentStyle.value} onScroll={handleScroll}>
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
          <div ref={scrollBodyRef} style={contentStyle.value} onScroll={handleScroll}>
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
