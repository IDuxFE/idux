import type { ComputedRef, Ref } from 'vue'
import type { PopperElement, PopperEvents, PopperOptions, PopperPlacement, PopperTriggerEvents } from './types'

import { computed, reactive, ref } from 'vue'
import { noop } from '@idux/cdk/utils'
import { convertElement } from './utils'

export function useElement<T>(): Ref<T | null> {
  const element: Ref<T | null> = ref(null)
  return element
}

export function useState(options: PopperOptions): Required<PopperOptions> {
  const {
    allowEnter = true,
    autoAdjust = true,
    disabled = false,
    offset = [0, 0],
    placement = 'top',
    trigger = 'hover',
    visible = false,
    hideDelay = 0,
    showDelay = 0,
    strategy = 'absolute',
    modifiers = [],
    onFirstUpdate = noop,
  } = options

  return reactive({
    allowEnter,
    autoAdjust,
    disabled,
    offset,
    placement,
    trigger,
    visible,
    hideDelay,
    showDelay,
    strategy,
    modifiers,
    onFirstUpdate,
  })
}

export type BaseOptions = Pick<
  Required<PopperOptions>,
  'placement' | 'strategy' | 'onFirstUpdate' | 'modifiers' | 'offset' | 'autoAdjust'
>

export function useBaseOptions(state: Required<PopperOptions>): ComputedRef<BaseOptions> {
  return computed(() => {
    const { placement, strategy, onFirstUpdate, modifiers, offset, autoAdjust } = state
    return { placement, strategy, onFirstUpdate, modifiers, offset, autoAdjust }
  })
}

export interface ExtraOptions {
  arrowElement: HTMLElement | null
  updatePlacement: (value: PopperPlacement) => void
}

export function useExtraOptions(
  state: Required<PopperOptions>,
  arrowRef: Ref<PopperElement | null>,
): {
  extraOptions: ComputedRef<ExtraOptions>
  visibility: ComputedRef<boolean>
  placement: ComputedRef<PopperPlacement>
} {
  const visibility = computed(() => !state.disabled && state.visible)
  const _placement = ref(state.placement)
  const updatePlacement = (value: PopperPlacement) => {
    _placement.value = value
  }
  const placement = computed(() => _placement.value)

  const extraOptions = computed(() => ({ arrowElement: convertElement(arrowRef), updatePlacement }))

  return { extraOptions, visibility, placement }
}

export function useTimer(): { setTimer: (action: () => void, delay: number) => void; clearTimer: () => void } {
  let timer: NodeJS.Timer | null = null

  const setTimer = (action: () => void, delay: number) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(action, delay)
  }

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { setTimer, clearTimer }
}

export function useTriggerEvents(
  baseOptions: Required<PopperOptions>,
  eventOptions: { visibility: ComputedRef<boolean>; show(): void; hide(): void; clearTimer(): void },
): ComputedRef<PopperTriggerEvents> {
  const { visibility, show, hide, clearTimer } = eventOptions

  const onMouseenter = () => {
    clearTimer()
    show()
  }

  const onMouseleave = () => {
    hide()
  }

  const onFocus = () => {
    show()
  }

  const onBlur = () => {
    hide()
  }

  const onClick = () => {
    const { trigger } = baseOptions
    if (trigger === 'click') {
      visibility.value ? hide() : show()
    } else if (trigger === 'contextmenu') {
      visibility.value && hide()
    }
  }

  const onContextmenu = (evt: Event) => {
    evt.preventDefault()
    show()
  }

  const eventsMap = {
    hover: { onMouseenter, onMouseleave },
    focus: { onFocus, onBlur },
    click: { onClick },
    contextmenu: { onClick, onContextmenu },
    manual: {},
  }

  return computed(() => eventsMap[baseOptions.trigger])
}

export function usePopperEvents(
  baseOptions: Required<PopperOptions>,
  eventOptions: { hide(): void; clearTimer(): void },
): ComputedRef<PopperEvents> {
  const { hide, clearTimer } = eventOptions

  const onMouseenter = () => {
    if (baseOptions.allowEnter) {
      clearTimer()
    }
  }

  const onMouseleave = () => {
    hide()
  }

  const eventsMap = {
    click: {},
    focus: {},
    hover: { onMouseenter, onMouseleave },
    contextmenu: {},
    manual: {},
  }

  return computed(() => eventsMap[baseOptions.trigger])
}
