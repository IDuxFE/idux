/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { App, Directive } from 'vue'

import { IxProForm } from '@idux/pro/form'
import { IxProLayout, IxProLayoutSiderTrigger } from '@idux/pro/layout'
import { IxProSearch } from '@idux/pro/search'
import { IxProTable, IxProTableLayoutTool } from '@idux/pro/table'
import { IxProTextarea } from '@idux/pro/textarea'
import { IxProTransfer } from '@idux/pro/transfer'
import { IxProTree } from '@idux/pro/tree'
import { version } from '@idux/pro/version'

const directives: Record<string, Directive> = {}

const components = [
  IxProForm,
  IxProLayout,
  IxProLayoutSiderTrigger,
  IxProTable,
  IxProTableLayoutTool,
  IxProTransfer,
  IxProTree,
  IxProTextarea,
  IxProSearch,
]

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

export * from '@idux/pro/form'
export * from '@idux/pro/layout'
export * from '@idux/pro/search'
export * from '@idux/pro/table'
export * from '@idux/pro/textarea'
export * from '@idux/pro/transfer'
export * from '@idux/pro/tree'
export * from '@idux/pro/version'
