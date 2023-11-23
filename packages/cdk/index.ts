/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { App, Directive } from 'vue'

import { CdkClickOutside, vClickOutside } from '@idux/cdk/click-outside'
import { CdkDraggable } from '@idux/cdk/drag-drop'
import { CdkPortal } from '@idux/cdk/portal'
import { CdkResizable, CdkResizableHandle, CdkResizeObserver } from '@idux/cdk/resize'
import { CdkVirtualScroll } from '@idux/cdk/scroll'
import { version } from '@idux/cdk/version'

const components = [
  CdkClickOutside,
  CdkDraggable,
  CdkPortal,
  CdkResizable,
  CdkResizableHandle,
  CdkResizeObserver,
  CdkVirtualScroll,
]

const directives: Record<string, Directive> = {
  clickOutside: vClickOutside,
}

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name ?? component.displayName, component)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })
}

const installer = { install, version }

export default installer
export { install }

export * from '@idux/cdk/a11y'
export * from '@idux/cdk/breakpoint'
export * from '@idux/cdk/click-outside'
export * from '@idux/cdk/drag-drop'
export * from '@idux/cdk/clipboard'
export * from '@idux/cdk/forms'
export * from '@idux/cdk/platform'
export * from '@idux/cdk/popper'
export * from '@idux/cdk/portal'
export * from '@idux/cdk/resize'
export * from '@idux/cdk/scroll'
export * from '@idux/cdk/theme'
export * from '@idux/cdk/utils'
export * from '@idux/cdk/version'
