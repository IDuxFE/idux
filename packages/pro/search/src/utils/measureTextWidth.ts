/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

const measureElementStyle = {
  position: 'fixed',
  visibility: 'hidden',
  whiteSpace: 'pre-wrap',
  top: '-100px',
  left: '-100px',
} as const
const textWidthStyleProps = ['fontSize', 'letterSpacing'] as const

export function measureTextWidth(text: string, parentEl?: HTMLElement): number {
  const _parentEl = parentEl as (HTMLElement & { __pro_search_measure_el: HTMLSpanElement }) | undefined
  const el = _parentEl?.__pro_search_measure_el ?? document.createElement('span')

  el.textContent = text
  Object.keys(measureElementStyle).forEach(key => {
    el.style.setProperty(key, measureElementStyle[key as keyof typeof measureElementStyle])
  })

  if (parentEl) {
    const parentStyle = getComputedStyle(parentEl)
    textWidthStyleProps.forEach(key => {
      el.style.setProperty(key, parentStyle[key])
    })
  }

  document.body.appendChild(el)

  void el.offsetWidth
  const textWidth = el.getBoundingClientRect().width

  if (el.parentElement === document.body) {
    document.body.removeChild(el)
  }

  if (_parentEl && !_parentEl.__pro_search_measure_el) {
    _parentEl.__pro_search_measure_el = el
  }

  return textWidth
}
