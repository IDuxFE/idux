import type { StrictModifiers } from '@popperjs/core'
import type { RefElement } from './types'

interface ModifierProps {
  offset: [number, number]
  arrow?: RefElement
  arrowOffset?: number
  showArrow?: boolean
}

export function useModifiers(
  { offset, arrow, arrowOffset, showArrow }: ModifierProps,
  externalModifiers: StrictModifiers[] = [],
): StrictModifiers[] {
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
