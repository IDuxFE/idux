/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Slot } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import { DRAWER_TOKEN, drawerToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots } = inject(drawerToken)!
    const { close } = inject(DRAWER_TOKEN)!

    const placement = computed(() => props.placement ?? 'right')
    const classes = computed(() => `ix-drawer ix-drawer-${placement.value}`)
    const isHorizontal = computed(() => placement.value === 'right' || placement.value === 'left')
    const drawerStyle = computed(() => {
      const width = props.width || (isHorizontal.value ? '30%' : '100%') // 不传值时水平方向宽度默认30%
      const height = props.height || (isHorizontal.value ? '100%' : '30%') // 不传值时垂直方向高度默认30%
      const renderOffset = convertCssPixel(props.offset)
      const offset = isHorizontal.value ? { top: renderOffset } : { left: renderOffset }
      return {
        width: convertCssPixel(width),
        height: convertCssPixel(height),
        ...offset,
      }
    })
    return () => {
      const titleElement = renderTitle(slots.title, props.title, props.closable, close)
      const footerElement = renderFooter(slots.footer, props.footer)
      return (
        <div class={classes.value} style={drawerStyle.value}>
          {titleElement}
          <section class="ix-drawer-body">{slots.default?.()}</section>
          {footerElement}
        </div>
      )
    }
  },
})

const renderTitle = (
  titleSlot: Slot | undefined,
  title: string | undefined,
  closable: boolean | undefined,
  close: (evt: Event) => void,
) => {
  if (!titleSlot && !title) {
    return null
  }
  const child = titleSlot ? titleSlot() : <span title={title}>{title}</span>
  return (
    <header class="ix-drawer-header">
      {child}
      {renderIcon(closable, close)}
    </header>
  )
}

const renderIcon = (closable: boolean | undefined, close: (evt: Event) => void) => {
  if (!closable) {
    return null
  }
  return (
    <button class="ix-drawer-close-btn" type="button" onClick={close}>
      <IxIcon class="ix-icon-close" name="close"></IxIcon>
    </button>
  )
}

const renderFooter = (footerSlot: Slot | undefined, footer: string | undefined) => {
  if (!footerSlot && !footer) {
    return null
  }
  const child = footerSlot ? footerSlot() : <span title={footer}>{footer}</span>
  return <footer class="ix-drawer-footer">{child}</footer>
}
