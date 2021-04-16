import type { ComputedRef, Ref } from 'vue'
import type { Options } from '@popperjs/core'
import type { OverlayElement, OverlayPlacement } from './types'

import { computed } from 'vue'
import { useModifiers } from './useModifiers'
import { isHTMLElement } from '@idux/cdk/utils'

type PartialOptions = Partial<Options>

interface PopperProps {
  arrowOffset?: number
  offset: [number, number]
  popperOptions?: PartialOptions
  placement: OverlayPlacement
  showArrow?: boolean
}

interface PopperState {
  arrow: Ref<OverlayElement | null>
}

export function usePopperOptions(props: PopperProps, state: PopperState): ComputedRef<PartialOptions> {
  return computed<PartialOptions>(() => {
    const arrowUnref = state.arrow.value
    const arrow = isHTMLElement(arrowUnref) ? arrowUnref : arrowUnref?.$el || null
    return {
      placement: props.placement,
      ...props.popperOptions,
      modifiers: useModifiers(
        { offset: props.offset, arrow, arrowOffset: props.arrowOffset, showArrow: props.showArrow },
        props.popperOptions?.modifiers,
      ),
    }
  })
}
