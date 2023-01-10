/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutSiderTriggerComponent } from '@idux/components/layout'
import type { ProFormComponent } from '@idux/pro/form'
import type { ProLayoutComponent } from '@idux/pro/layout'
import type { ProSearchComponent } from '@idux/pro/search'
import type { ProTableComponent, ProTableLayoutToolComponent } from '@idux/pro/table'
import type { ProTextareaComponent } from '@idux/pro/textarea'
import type { ProTransferComponent } from '@idux/pro/transfer'
import type { ProTreeComponent } from '@idux/pro/tree'

declare module 'vue' {
  export interface GlobalComponents {
    IxProForm: ProFormComponent
    IxProLayout: ProLayoutComponent
    /**
     * @deprecated please use `IxLayoutSiderTrigger` instead'
     */
    IxProLayoutSiderTrigger: LayoutSiderTriggerComponent
    IxProTable: ProTableComponent
    IxProTableLayoutTool: ProTableLayoutToolComponent
    IxProTextarea: ProTextareaComponent
    IxProTransfer: ProTransferComponent
    IxProTree: ProTreeComponent
    IxProSearch: ProSearchComponent
  }
}

export {}
