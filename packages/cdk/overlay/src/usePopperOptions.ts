import type { ComputedRef, Ref } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import type { RefElement } from './types'

import { computed } from 'vue'
import { useModifiers } from './useModifiers'

type PartialOptions = Partial<Options>

interface PopperProps {
  arrowOffset?: number
  offset: [number, number]
  popperOptions?: PartialOptions
  placement: Placement
  showArrow?: boolean
}

interface PopperState {
  arrow: Ref<RefElement>
}

export function usePopperOptions(props: PopperProps, state: PopperState): ComputedRef<PartialOptions> {
  return computed<PartialOptions>(() => ({
    placement: props.placement,
    ...props.popperOptions,
    modifiers: useModifiers(
      { offset: props.offset, arrow: state.arrow.value, arrowOffset: props.arrowOffset, showArrow: props.showArrow },
      props.popperOptions?.modifiers,
    ),
  }))
}
