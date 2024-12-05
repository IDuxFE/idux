/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperEvents, PopperTriggerEvents } from '@idux/cdk/popper'

import { type ComputedRef, computed } from 'vue'

export interface MergedEventsContext {
  mergedTriggerEvents: ComputedRef<PopperTriggerEvents>
  mergedPopperEvents: ComputedRef<PopperEvents>
}

export function useMergedEvents(
  triggerEvents: ComputedRef<PopperTriggerEvents>,
  popperEvents: ComputedRef<PopperEvents>,
  stateTriggerEvents: PopperTriggerEvents,
  statePopperEvents: PopperEvents,
): MergedEventsContext {
  const mergedTriggerEvents = computed(() => mergeEvents(triggerEvents.value, stateTriggerEvents))
  const mergedPopperEvents = computed(() => mergeEvents(popperEvents.value, statePopperEvents))

  return {
    mergedTriggerEvents,
    mergedPopperEvents,
  }
}

function mergeEvents<Events extends PopperEvents | PopperTriggerEvents>(events: Events, extendedEvents: Events) {
  const mergedEvents = { ...events }

  Object.entries(extendedEvents).forEach(([key, cb]) => {
    if (key in mergedEvents) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalCb = mergedEvents[key as keyof Events] as any
      mergedEvents[key as keyof Events] = ((evt: Event) => {
        cb(evt)
        originalCb(evt)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    }
  })

  return mergedEvents
}
