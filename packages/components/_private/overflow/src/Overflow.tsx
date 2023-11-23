/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'

import { Ref, computed, defineComponent, ref, watch } from 'vue'

import { isNumber } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { getBoxSizingData, throwError } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import Item from './Item'
import { overflowProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any

const restNodeKey = '__IDUX_OVERFLOW_REST'
const suffixNodeKey = '__IDUX_OVERFLOW_SUFFIX' as VKey
const responsive = 'responsive'

export default defineComponent({
  name: 'ɵOverflow',
  props: overflowProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId } = useThemeToken()

    const mergedPrefixCls = computed(() => `${common.prefixCls}-overflow`)
    const containerElRef = ref<HTMLElement | undefined>()

    const { containerWidth, setContainerWidth } = useContainerSize(containerElRef)
    const { itemsWidthMap, setItemWidth } = useItemSize()
    const restWidth = ref(0)
    const suffixWidth = ref(0)

    const displayCount = ref(props.dataSource.length)
    const isResponsive = computed(() => props.maxLabel === responsive)
    const restReady = ref(false)
    const showRest = computed(
      () => isResponsive.value || (isNumber(props.maxLabel) && props.dataSource.length > props.maxLabel),
    )

    const mergedData = computed(() => {
      if (!isResponsive.value) {
        return props.dataSource.slice(0, props.maxLabel as number)
      }
      return props.dataSource
    })
    const restData = computed(() => props.dataSource.slice(displayCount.value))
    const displayRest = computed(() => restReady.value && !!restData.value.length)

    watch(
      [itemsWidthMap, containerWidth, restWidth, suffixWidth, mergedData],
      () => {
        const len = props.dataSource.length
        const lastIndex = len - 1

        const data: SafeAny = props.dataSource ?? []
        let totalWidth = 0
        if (!len) {
          displayCount.value = 0
          return
        }

        if (!isResponsive.value) {
          displayCount.value = Math.min(props.maxLabel as number, len)
          restReady.value = true
          return
        }

        const internalContainerWidth = containerWidth.value - suffixWidth.value

        for (let i = 0; i < len; i++) {
          const getItemWidth = (index: number) => itemsWidthMap.value.get(props.getKey(data[index])) ?? 0
          const curItemWidth = getItemWidth(i)

          // break when item is not ready
          if (!curItemWidth) {
            displayCount.value = i + 1
            break
          }
          restReady.value = true

          totalWidth += curItemWidth

          // container width is enough
          if (i === lastIndex && totalWidth <= internalContainerWidth) {
            displayCount.value = i + 1
            break
          } else if (totalWidth + restWidth.value > internalContainerWidth) {
            // container width is not enough, rest node appeared
            displayCount.value = i
            break
          }

          displayCount.value = i + 1
        }
      },
      {
        deep: true,
        immediate: true,
        flush: 'post',
      },
    )

    useResizeObserver(containerElRef, setContainerWidth)

    const itemSharedProps = {
      prefixCls: mergedPrefixCls.value,
    }

    const internalRenderItem = (item: SafeAny, index: number) => {
      if (!slots.item) {
        throwError('components/_private/overflow', 'item slot must be provided')
      }
      const nodeContent = slots.item?.(item) ?? ''

      const key = props.getKey(item)
      return (
        <Item
          {...itemSharedProps}
          key={key}
          itemKey={key}
          display={index < displayCount.value}
          onSizeChange={(entry, key) => setItemWidth(key!, entry)}
        >
          {nodeContent}
        </Item>
      )
    }
    const internalRenderRest = (rest: unknown[]) => {
      const nodeContent = slots.rest?.(rest) ?? `+ ${rest.length} ...`

      return (
        <Item
          {...itemSharedProps}
          class={`${mergedPrefixCls.value}-rest`}
          itemKey={restNodeKey}
          display={displayRest.value}
          onSizeChange={entry => (restWidth.value = entry?.contentRect.width ?? 0)}
        >
          {nodeContent}
        </Item>
      )
    }
    const internalRenderSuffix = () => {
      const nodeContent = slots.suffix?.() ?? null

      return nodeContent ? (
        <Item
          {...itemSharedProps}
          class={`${mergedPrefixCls.value}-suffix`}
          itemKey={suffixNodeKey}
          onSizeChange={entry => (suffixWidth.value = entry?.contentRect.width ?? 0)}
        >
          {nodeContent}
        </Item>
      ) : null
    }
    return () => {
      return (
        <div class={`${mergedPrefixCls.value} ${props.prefixCls}-overflow ${globalHashId.value}`} ref={containerElRef}>
          {mergedData.value.map(internalRenderItem)}
          {showRest.value && internalRenderRest(restData.value)}
          {internalRenderSuffix()}
        </div>
      )
    }
  },
})

const useContainerSize = (containerElRef: Ref<HTMLElement | undefined>) => {
  const containerWidth = ref(0)
  const _getContainerWidth = () => {
    const containerEl = containerElRef.value
    if (!containerEl) {
      return 0
    }

    const { width } = containerEl.getBoundingClientRect()
    const { paddingLeft, paddingRight } = getBoxSizingData(containerEl)

    return width - paddingLeft - paddingRight
  }
  const setContainerWidth = () => {
    containerWidth.value = _getContainerWidth()
  }

  return {
    containerWidth,
    setContainerWidth,
  }
}

const useItemSize = () => {
  const itemsWidthMap = ref<Map<VKey, number>>(new Map())
  const setItemWidth = (key: VKey, entry?: ResizeObserverEntry) => {
    if (!entry?.target && itemsWidthMap.value.get(key)) {
      itemsWidthMap.value.delete(key)
    } else if (entry?.contentRect.width) {
      itemsWidthMap.value.set(key, entry.contentRect.width)
    }
  }

  return {
    itemsWidthMap,
    setItemWidth,
  }
}
