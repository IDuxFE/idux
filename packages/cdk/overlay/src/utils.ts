/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverlayElement, OverlayPlacement } from './types'
import type { Options, StrictModifiers } from '@popperjs/core'
import type { ComputedRef, Ref } from 'vue'

import { computed } from 'vue'

import { isHTMLElement } from '@idux/cdk/utils'

export const convertElement = (elementRef: Ref<OverlayElement | null>): ComputedRef<HTMLElement> => {
  return computed(() => {
    const element = elementRef.value
    if (element === null) {
      return null
    }
    return isHTMLElement(element) ? element : element.$el
  })
}

interface ModifierProps {
  offset: [number, number]
  arrow: HTMLElement | null
  arrowOffset?: number
  showArrow?: boolean
}

function convertModifiers(
  { offset, arrow, arrowOffset, showArrow }: ModifierProps,
  externalModifiers: StrictModifiers[] = [],
) {
  const modifiers: StrictModifiers[] = [
    { name: 'offset', options: { offset } },
    { name: 'preventOverflow', options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } } },
    { name: 'flip', options: { padding: 5 } },
  ]
  if (showArrow) {
    modifiers.push({
      name: 'arrow',
      options: {
        element: arrow,
        padding: arrowOffset ?? 5,
      },
    })
  }

  modifiers.push(...externalModifiers)

  return modifiers
}
interface PopperOptions {
  placement: OverlayPlacement
  popperOptions?: Partial<Options>
  offset: [number, number]
  arrow: HTMLElement | null
  arrowOffset?: number
  showArrow?: boolean
}

export const convertPopperOptions = (options: PopperOptions): Partial<Options> => {
  const { placement, popperOptions, offset, arrow, arrowOffset, showArrow } = options
  return {
    placement,
    ...popperOptions,
    modifiers: convertModifiers({ offset, arrow, arrowOffset, showArrow }, popperOptions?.modifiers),
  }
}
