import type { App } from 'vue'

import IxCollapse from './src/Collapse.vue'
import IxCollapsePanel from './src/CollapsePanel.vue'

IxCollapse.install = (app: App): void => {
  app.component(IxCollapse.name, IxCollapse)
}
IxCollapsePanel.install = (app: App): void => {
  app.component(IxCollapsePanel.name, IxCollapsePanel)
}

export { IxCollapse, IxCollapsePanel }

export type { CollapseProps, CollapseComponent, CollapsePanelProps, CollapsePanelComponent } from './src/types'
