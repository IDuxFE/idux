/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { App, Directive } from 'vue'

import { IxProLayout, IxProLayoutSiderTrigger } from '@idux/pro/layout'
import { IxProTable, IxProTableLayoutTool } from '@idux/pro/table'
import { IxProTransfer } from '@idux/pro/transfer'
import { IxProTree } from '@idux/pro/tree'
import { version } from '@idux/pro/version'

const directives: Record<string, Directive> = {}

const components = [IxProLayout, IxProLayoutSiderTrigger, IxProTable, IxProTableLayoutTool, IxProTransfer, IxProTree]

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

export * from '@idux/pro/layout'
export * from '@idux/pro/table'
export * from '@idux/pro/transfer'
export * from '@idux/pro/tree'
export * from '@idux/pro/version'
