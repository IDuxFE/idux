import type { ComputedRef, Ref } from 'vue'
import type { OverlayElement, OverlayOptions, OverlayPlacement } from './types'

import { computed } from 'vue'
import { kebabCase, camelCase } from 'lodash'
import { isHTMLElement } from '@idux/cdk/utils'

const defaultOptions: Required<OverlayOptions> = {
  visible: true,
  scrollStrategy: 'none',
  disabled: false,
  placement: 'top',
  trigger: 'manual',
  allowEnter: false,
  autoAdjust: true,
  offset: [0, 0],
  hideDelay: 0,
  showDelay: 0,
}

export function useDefaultOptions(options: OverlayOptions): Required<OverlayOptions> {
  return Object.assign({}, defaultOptions, options)
}

export function convertElement(elementRef: Ref<OverlayElement | null>): ComputedRef<HTMLElement> {
  return computed(() => {
    const element = elementRef.value
    if (element === null) {
      return null
    }
    return isHTMLElement(element) ? element : element.$el
  })
}

export function usePoints(placement: OverlayPlacement): DomAlignConfig['points'] {
  const placementMap: Record<OverlayPlacement, DomAlignConfig['points']> = {
    topStart: ['bl', 'tl'],
    top: ['bc', 'tc'],
    topEnd: ['br', 'tr'],
    bottomStart: ['tl', 'bl'],
    bottom: ['tc', 'bc'],
    bottomEnd: ['tr', 'br'],
    leftStart: ['tr', 'tl'],
    left: ['cr', 'cl'],
    leftEnd: ['br', 'bl'],
    rightStart: ['tl', 'tr'],
    right: ['cl', 'cr'],
    rightEnd: ['bl', 'br'],
  }

  return placementMap[placement]
}

export function useDomAlignConfig({ placement, offset, autoAdjust }: Required<OverlayOptions>): DomAlignConfig {
  return {
    points: usePoints(placement),
    offset,
    overflow: { adjustX: autoAdjust, adjustY: autoAdjust },
    useCssTransform: true,
  }
}

export function usePlacement(
  source: HTMLElement,
  target: HTMLElement,
  scrollingElement: Element | null,
  placement: OverlayPlacement,
): OverlayPlacement {
  if (!scrollingElement) {
    // fix quirks mode
    scrollingElement = document.documentElement
  }
  const align = placement.startsWith('top') || placement.startsWith('bottom') ? 'vertical' : 'horizontal'
  const {
    scrollWidth,
    scrollLeft,
    scrollHeight,
    scrollTop,
    clientWidth: viewportWidth,
    clientHeight: viewportHeight,
  } = scrollingElement as HTMLElement
  const { offsetLeft, offsetWidth: targetWidth, offsetTop, offsetHeight: targetHeight } = target
  const { offsetWidth: sourceWidth, offsetHeight: sourceHeight } = source

  if (align === 'vertical') {
    const topEnough = offsetTop - scrollTop > sourceHeight
    const bottomEnough =
      scrollHeight - offsetTop - targetHeight - (scrollHeight - scrollTop - viewportHeight) > sourceHeight
    const [vertical, horizontal = ''] = kebabCase(placement).split('-')
    let correctVertical = vertical

    if (!topEnough) {
      correctVertical = 'bottom'
    }
    if (!bottomEnough) {
      correctVertical = 'top'
    }
    if (!topEnough && !bottomEnough) {
      correctVertical = vertical
    }
    return camelCase(`${correctVertical}-${horizontal}`) as OverlayPlacement
  } else {
    const leftEnough = offsetLeft - scrollLeft > sourceWidth
    const rightEnough =
      scrollWidth - offsetLeft - targetWidth - (scrollWidth - scrollLeft - viewportWidth) > sourceWidth

    const [horizontal, vertical = ''] = kebabCase(placement).split('-')
    let correctHorizontal = horizontal
    if (!leftEnough) {
      correctHorizontal = 'right'
    }
    if (!rightEnough) {
      correctHorizontal = 'left'
    }
    if (!leftEnough && !rightEnough) {
      correctHorizontal = horizontal
    }
    return camelCase(`${correctHorizontal}-${vertical}`) as OverlayPlacement
  }
}
