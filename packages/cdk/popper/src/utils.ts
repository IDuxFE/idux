import type { Ref } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import type { BaseOptions } from './hooks'
import type { PopperElement, PopperPlacement } from './types'

import { unref } from 'vue'
import { camelCase, kebabCase } from 'lodash'
import { isHTMLElement } from '@idux/cdk/utils'

export function convertElement(elementRef: Ref<PopperElement | null> | PopperElement | null): HTMLElement | null {
  const element = unref(elementRef)
  if (!element) {
    return null
  }
  return isHTMLElement(element) ? element : element.$el
}

export interface ExtraOptions {
  arrowElement: HTMLElement | null
  updatePlacement: (value: PopperPlacement) => void
}

export function convertOptions(baseOptions: BaseOptions, extraOptions: ExtraOptions): Options {
  const { placement, strategy, onFirstUpdate, modifiers, offset, autoAdjust } = baseOptions
  const { arrowElement, updatePlacement } = extraOptions
  return {
    placement: kebabCase(placement) as Placement,
    strategy,
    onFirstUpdate,
    modifiers: [
      { name: 'offset', options: { offset } },
      { name: 'flip', enabled: autoAdjust, options: { padding: 4 } },
      { name: 'arrow', enabled: !!arrowElement, options: { element: arrowElement, padding: 4 } },
      {
        name: 'IDUX_updatePlacement',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => updatePlacement(camelCase(state.placement) as PopperPlacement),
      },
      ...modifiers,
    ],
  }
}
