/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps, SearchItem, Segment } from '../types'

import { type ComputedRef, type Ref, computed, nextTick } from 'vue'

import { type VKey, useState } from '@idux/cdk/utils'

export interface ActiveSegmentContext {
  isActive: ComputedRef<boolean>
  activeSegment: ComputedRef<ActiveSegment | undefined>
  setActiveSegment: (segment: ActiveSegment | undefined) => void
  changeActive: (offset: number, crossItem?: boolean) => void
  setInactive: (blur?: boolean) => void

  nameSelectActive: ComputedRef<boolean>
  setNameSelectActive: () => void
  quickSelectActive: ComputedRef<boolean>
  setQuickSelectActive: () => void

  setTempActive: () => void

  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (overlayOpened: boolean) => void
}
export interface ActiveSegment {
  itemKey: VKey
  name: string
}
type FlattenedSegment = Segment & { itemKey: VKey; segmentVisible: boolean }

export function useActiveSegment(
  props: ProSearchProps,
  tempSegmentInputRef: Ref<HTMLInputElement | undefined>,
  searchItems: ComputedRef<SearchItem[] | undefined>,
  enableQuickSelect: ComputedRef<boolean>,
  isSegmentVisible: (key: VKey, name: string) => boolean,
): ActiveSegmentContext {
  const [activeSegment, _setActiveSegment] = useState<ActiveSegment | undefined>(undefined)
  const [nameSelectActive, _setNameSelectActive] = useState<boolean>(false)
  const [quickSelectActive, _setQuickSelectActive] = useState<boolean>(false)
  const [overlayOpened, setOverlayOpened] = useState<boolean>(false)

  const isActive = computed(() => !!activeSegment.value || nameSelectActive.value || quickSelectActive.value)

  const mergedActiveSegment = computed(() => (props.disabled ? undefined : activeSegment.value))
  const flattenedSegments = computed(() => flattenSegments(searchItems.value ?? [], isSegmentVisible))
  const activeItem = computed(() => searchItems.value?.find(item => item.key === activeSegment.value?.itemKey))
  const activeSegmentIndex = computed(() =>
    flattenedSegments.value.findIndex(
      segment => segment.itemKey === activeSegment.value?.itemKey && segment.name === activeSegment.value.name,
    ),
  )

  const setActiveSegment = (segment: ActiveSegment | undefined) => {
    if (props.disabled) {
      _setActiveSegment(undefined)
      return
    }

    _setActiveSegment(segment)
  }

  const updateActiveSegment = (segment: ActiveSegment | undefined) => {
    if (
      segment &&
      activeSegment.value &&
      activeSegment.value.itemKey === segment.itemKey &&
      activeSegment.value.name === segment.name
    ) {
      return
    }

    setActiveSegment(segment)

    if (segment) {
      _setNameSelectActive(false)
      _setQuickSelectActive(false)
    }
  }

  const changeActive = (offset: number, crossItem = false) => {
    if (!activeSegment.value || offset === 0) {
      return
    }

    let targetIndex = activeSegmentIndex.value + offset

    while (
      targetIndex > 0 &&
      targetIndex < flattenedSegments.value.length - 1 &&
      !flattenedSegments.value[targetIndex]?.segmentVisible
    ) {
      targetIndex = offset > 0 ? targetIndex + 1 : targetIndex - 1
    }

    targetIndex = offset > 0 ? Math.min(targetIndex, flattenedSegments.value.length - 1) : Math.max(targetIndex, 0)
    let targetSegment = flattenedSegments.value[targetIndex]

    if (activeItem.value && targetSegment?.itemKey !== activeSegment.value.itemKey && !crossItem) {
      updateActiveSegment({
        itemKey: activeItem.value!.key,
        name: activeItem.value!.resolvedSearchField.segments.filter(segment =>
          isSegmentVisible(activeItem.value!.key, segment.name),
        )[offset < 0 ? 0 : activeItem.value!.resolvedSearchField.segments.length - 1].name,
      })
      setOverlayOpened(!crossItem)
      return
    }

    /* eslint-disable indent */
    if (!targetSegment.segmentVisible) {
      const visibleSegments = flattenedSegments.value.filter(segment => segment.segmentVisible)
      targetSegment =
        targetIndex === 0
          ? visibleSegments[0]
          : targetIndex === flattenedSegments.value.length - 1
            ? visibleSegments[visibleSegments.length - 1]
            : targetSegment
    }

    updateActiveSegment(
      targetSegment
        ? {
            itemKey: targetSegment.itemKey,
            name: targetSegment.name,
          }
        : undefined,
    )
    setOverlayOpened(!crossItem)
    /* eslint-enable indent */
  }

  const setInactive = () => {
    setActiveSegment(undefined)
    _setNameSelectActive(false)
    _setQuickSelectActive(false)
  }
  const setNameSelectActive = () => {
    setActiveSegment(undefined)
    _setNameSelectActive(true)
    _setQuickSelectActive(false)
  }
  const setQuickSelectActive = () => {
    setActiveSegment(undefined)
    _setQuickSelectActive(true)
    _setNameSelectActive(false)
  }

  const setTempActive = () => {
    if (quickSelectActive.value || nameSelectActive.value) {
      return
    }

    if (enableQuickSelect.value) {
      setQuickSelectActive()
    } else {
      setNameSelectActive()
    }

    nextTick(() => {
      tempSegmentInputRef.value?.focus()
    })

    setOverlayOpened(true)
  }

  return {
    isActive,
    activeSegment: mergedActiveSegment,
    setActiveSegment: updateActiveSegment,
    changeActive,
    setInactive,
    nameSelectActive,
    setNameSelectActive,
    quickSelectActive,
    setQuickSelectActive,
    setTempActive,
    overlayOpened,
    setOverlayOpened,
  }
}

function flattenSegments(
  searchItems: SearchItem[],
  isSegmentVisible: (key: VKey, name: string) => boolean,
): FlattenedSegment[] {
  const segments: FlattenedSegment[] = []
  searchItems.forEach(item => {
    segments.push(
      ...item.resolvedSearchField.segments.map(segment => ({
        ...segment,
        itemKey: item.key,
        segmentVisible: isSegmentVisible(item.key, segment.name),
      })),
    )
  })

  return segments
}
