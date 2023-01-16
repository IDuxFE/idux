/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchProps, SearchItem, Segment } from '../types'

import { type ComputedRef, type Ref, computed } from 'vue'

import { type VKey, useState } from '@idux/cdk/utils'

import { tempSearchStateKey } from './useSearchStates'

export interface ActiveSegmentContext {
  activeSegment: ComputedRef<ActiveSegment | undefined>
  setActiveSegment: (segment: ActiveSegment | undefined) => void
  changeActive: (offset: number, crossItem?: boolean) => void
  setInactive: (blur?: boolean) => void
  setTempActive: (overlayOpened?: boolean) => void
}
export interface ActiveSegment {
  itemKey: VKey
  name: string
  overlayOpened: boolean
}
type FlattenedSegment = Segment & { itemKey: VKey }

export function useActiveSegment(
  props: ProSearchProps,
  elementRef: Ref<HTMLElement | undefined>,
  searchItems: ComputedRef<SearchItem[] | undefined>,
  tempSearchStateAvailable: ComputedRef<boolean>,
): ActiveSegmentContext {
  const [activeSegment, setActiveSegment] = useState<ActiveSegment | undefined>(undefined)
  const mergedActiveSegment = computed(() => (props.disabled ? undefined : activeSegment.value))
  const flattenedSegments = computed(() => flattenSegments(searchItems.value ?? []))
  const activeItem = computed(() => searchItems.value?.find(item => item.key === activeSegment.value?.itemKey))
  const activeSegmentIndex = computed(() =>
    flattenedSegments.value.findIndex(
      segment => segment.itemKey === activeSegment.value?.itemKey && segment.name === activeSegment.value.name,
    ),
  )

  const updateActiveSegment = (segment: ActiveSegment | undefined) => {
    if (
      activeSegment.value?.itemKey === segment?.itemKey &&
      activeSegment.value?.name === segment?.name &&
      activeSegment.value?.overlayOpened === segment?.overlayOpened
    ) {
      return
    }

    setActiveSegment(segment)
  }

  const changeActive = (offset: number, crossItem = false) => {
    if (!activeSegment.value) {
      return
    }

    let targetIndex = activeSegmentIndex.value + offset
    targetIndex = offset > 0 ? Math.min(targetIndex, flattenedSegments.value.length - 1) : Math.max(targetIndex, 0)
    const targetSegment = flattenedSegments.value[targetIndex]

    if (activeItem.value && targetSegment?.itemKey !== activeSegment.value.itemKey && !crossItem) {
      updateActiveSegment({
        itemKey: activeItem.value!.key,
        name: activeItem.value!.segments[offset < 0 ? 0 : activeItem.value!.segments.length - 1].name,
        overlayOpened: !crossItem,
      })
      return
    }

    /* eslint-disable indent */
    updateActiveSegment(
      targetSegment
        ? {
            itemKey: targetSegment.itemKey,
            name: targetSegment.name,
            overlayOpened: !crossItem,
          }
        : undefined,
    )
    /* eslint-enable indent */
  }

  const setInactive = (blur?: boolean) => {
    setActiveSegment(undefined)

    // when no segment is active the component will lose focus
    // so set the container element focused if we do not intend to blur the component
    if (!blur) {
      elementRef.value?.focus()
    }
  }

  const setTempActive = (overlayOpened = false) => {
    if (!tempSearchStateAvailable.value) {
      setInactive()
    } else {
      setActiveSegment({
        itemKey: tempSearchStateKey,
        name: activeSegment.value?.itemKey === tempSearchStateKey ? activeSegment.value.name : 'name',
        overlayOpened,
      })
    }
  }

  return {
    activeSegment: mergedActiveSegment,
    setActiveSegment: updateActiveSegment,
    changeActive,
    setInactive,
    setTempActive,
  }
}

function flattenSegments(searchItems: SearchItem[]): FlattenedSegment[] {
  const segments: FlattenedSegment[] = []
  searchItems.forEach(item => {
    segments.push(...item.segments.map(segment => ({ ...segment, itemKey: item.key })))
  })

  return segments
}
