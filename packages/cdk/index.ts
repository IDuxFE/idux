/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { App, Directive } from 'vue'

import { clickOutside } from '@idux/cdk/click-outside'
import { CdkPortal } from '@idux/cdk/portal'
import { CdkVirtualScroll } from '@idux/cdk/scroll'
import { version } from '@idux/cdk/version'

const components = [CdkPortal, CdkVirtualScroll]

const directives: Record<string, Directive> = {
  clickOutside,
}

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name ?? component.displayName, component)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })
}

export default {
  install,
  version,
}
