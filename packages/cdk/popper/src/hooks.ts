import type { ComputedRef, Ref, WatchStopHandle } from 'vue'
import type { Placement } from '@popperjs/core'
import type {
  PopperElement,
  PopperEvents,
  PopperOptions,
  PopperPlacement,
  PopperTrigger,
  PopperTriggerEvents,
} from './types'

import { computed, reactive, ref, watch } from 'vue'
import { camelCase, kebabCase } from 'lodash'
import { isUndefined } from '@idux/cdk/utils'
import { mapTriggerEvents } from '@idux/cdk/popper/src/utils'

export type PopperState = Required<Omit<PopperOptions, 'placement'> & { placement: Placement }>

export function useState(options: PopperOptions): PopperState {
  const state = reactive<Required<Omit<PopperOptions, 'placement'> & { placement: Placement }>>({
    visible: true,
    scrollStrategy: 'reposition',
    disabled: false,
    placement: 'top',
    trigger: 'manual',
    allowEnter: false,
    autoAdjust: true,
    offset: [0, 0],
    hideDelay: 0,
    showDelay: 0,
  })

  watch(
    () => state.placement,
    value => {
      state.placement = kebabCase(value) as Placement
    },
  )

  for (const [key, value] of Object.entries(options)) {
    if (isUndefined(value)) {
      continue
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    state[key] = value
  }

  return state
}

export function useVisibility(state: PopperState, action: () => void): [ComputedRef<boolean>, WatchStopHandle] {
  const visibility = computed(() => !state.disabled && state.visible)

  const watcher = watch(
    visibility,
    value => {
      if (value) {
        action()
      }
    },
    { flush: 'post' },
  )

  return [visibility, watcher]
}

export function usePlacement(state: PopperState, action: () => void): [ComputedRef<PopperPlacement>, WatchStopHandle] {
  const placement = computed(() => camelCase(state.placement) as PopperPlacement)

  const watcher = watch(
    placement,
    () => {
      action()
    },
    { flush: 'post' },
  )

  return [placement, watcher]
}

export function useElement<T extends PopperElement>(): Ref<T | null> {
  const element: Ref<T | null> = ref(null)
  return element
}

export function useTimer(): [Ref<NodeJS.Timer | null>, (fn: () => void, delay: number) => void] {
  const timer = ref<NodeJS.Timer | null>(null)

  const setTimer = (fn: () => void, delay: number) => {
    timer.value = setTimeout(fn, delay)
  }

  return [timer, setTimer]
}

export function useTriggerEvents(
  state: PopperState,
  visibility: ComputedRef<boolean>,
  timer: Ref<NodeJS.Timer | null>,
  action: { show(): void; hide(): void },
): ComputedRef<PopperTriggerEvents> {
  const triggerEventsMap: Record<PopperTrigger, (keyof PopperTriggerEvents)[]> = {
    click: ['onClick'],
    focus: ['onFocus', 'onBlur'],
    hover: ['onMouseenter', 'onMouseleave'],
    contextmenu: ['onContextmenu'],
    manual: [],
  }
  return computed(() => mapTriggerEvents(triggerEventsMap[state.trigger], state, visibility, timer, action))
}

export function usePopperEvents(
  state: PopperState,
  timer: Ref<NodeJS.Timer | null>,
  hide: () => void,
): ComputedRef<PopperEvents> {
  const onMouseenter = () => {
    if (state.trigger === 'hover' && state.allowEnter && timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }

  const onMouseleave = () => {
    if (state.trigger !== 'hover') {
      return
    }
    hide()
  }

  return computed(() => ({ onMouseenter, onMouseleave }))
}
