/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Teleport, computed, defineComponent, provide, toRef, watch } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, callEmit, useState } from '@idux/cdk/utils'

import { useDndSortable } from '../composables/useDndSortable'
import { useGetKey } from '../composables/useGetKey'
import { defaultSortableEffect, defaultSortableStrategy } from '../consts'
import { CDK_DND_SORTABLE_TOKEN, dndSortableToken } from '../tokens'
import {
  type CanDragOptions,
  type CanDropOptions,
  type DndSortableData,
  type DndSortableIsStickyOptions,
  type DndSortablePreviewState,
  type DndSortableReorderInfo,
  dndSortableProps,
} from '../types'
import { getMergedCanFn } from '../utils'

const lastMovedKeyMostWaitTime = 3000

export default defineComponent({
  name: 'DndSortable',
  props: dndSortableProps,
  setup(props, { slots }) {
    const dataSource = toRef(props, 'dataSource')
    const direction = toRef(props, 'direction')
    const getKey = toRef(props, 'getKey')
    const childrenKey = toRef(props, 'childrenKey')
    const treeIndent = toRef(props, 'treeIndent')
    const mergedGetKey = useGetKey(getKey)
    const mergedStrategy = computed(() => props.strategy ?? defaultSortableStrategy)
    const mergedEffect = computed(() => props.effect ?? defaultSortableEffect)

    const [lastMovedKey, setLastMovedKey] = useState<VKey | undefined>(undefined)
    const [previewState, setPreviewState] = useState<DndSortablePreviewState | null>(null)

    const mergedCanDrag = getMergedCanFn<CanDragOptions>(() => props.canDrag)
    const mergedCanDrop = getMergedCanFn<CanDropOptions>(() => props.canDrop)
    const mergedIsSticky = getMergedCanFn<DndSortableIsStickyOptions>(() => props.isSticky)

    let tempLastMovedKey: VKey | undefined
    let tempLastMovedKeySetTmr: number

    watch(
      () => props.dataSource,
      () => {
        if (!isNil(tempLastMovedKey)) {
          clearTimeout(tempLastMovedKeySetTmr)
          setLastMovedKey(tempLastMovedKey)
          tempLastMovedKey = undefined
          setTimeout(() => {
            setLastMovedKey(undefined)
          }, 10)
        }
      },
      { deep: true },
    )

    const onSortReorder = (reorderInfo: DndSortableReorderInfo) => {
      const { sourceKey } = reorderInfo
      clearTimeout(tempLastMovedKeySetTmr)
      tempLastMovedKey = sourceKey
      tempLastMovedKeySetTmr = setTimeout(() => {
        tempLastMovedKey = undefined
      }, lastMovedKeyMostWaitTime)

      callEmit(props.onSortReorder, reorderInfo)
    }
    const onSortChange = (newDataSource: DndSortableData[], oldDataSource: DndSortableData[]) => {
      callEmit(props.onSortChange, newDataSource, oldDataSource)
    }

    const previewMount = (state: DndSortablePreviewState) => {
      setPreviewState(state)
    }
    const previewUnmount = () => {
      setPreviewState(null)
    }

    const mergedPreview = computed(() => {
      if (isNil(props.preview) || props.preview === 'native') {
        return true
      }

      if (props.preview === false) {
        return false
      }

      if (props.preview === true) {
        return {
          mount: previewMount,
          unmount: previewUnmount,
        }
      }

      return {
        offset: props.preview.offset,
        mount: previewMount,
        unmount: previewUnmount,
      }
    })

    const dndSortableContext = useDndSortable({
      strategy: mergedStrategy,
      dataSource,
      direction,
      getKey: mergedGetKey,
      childrenKey,
      treeIndent,
      preview: mergedPreview,
      isTreeItemExpanded: props.isTreeItemExpanded,
      canDrag: mergedCanDrag,
      canDrop: mergedCanDrop,
      isSticky: mergedIsSticky,
      onDragStart(args) {
        callEmit(props.onDragStart, args)
      },
      onDrag(args) {
        callEmit(props.onDrag, args)
      },
      onDragEnter(args) {
        callEmit(props.onDragEnter, args)
      },
      onDragLeave(args) {
        callEmit(props.onDragLeave, args)
      },
      onDrop(args) {
        callEmit(props.onDrop, args)
      },
      onSortChange,
      onSortReorder,
    })

    provide(dndSortableToken, {
      ...dndSortableContext,
      lastMovedKey,
      mergedStrategy,
      mergedEffect,
    })
    provide(CDK_DND_SORTABLE_TOKEN, {
      draggingState: dndSortableContext.draggingState,
      draggingOverState: dndSortableContext.draggingOverState,
    })

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = props.tag as any
      const preview = previewState.value

      const contentNodes = [
        slots.default?.(),
        preview && <Teleport to={preview?.container}>{slots.preview?.(preview)}</Teleport>,
      ]

      return Tag ? <Tag>{contentNodes}</Tag> : <>{contentNodes}</>
    }
  },
})
