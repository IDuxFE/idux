import type { App } from 'vue'

import IxButton from './src/Button.vue'
import IxButtonGroup from './src/ButtonGroup.vue'

IxButton.install = (app: App): void => {
  app.component(IxButton.name, IxButton)
}

IxButtonGroup.install = (app: App): void => {
  app.component(IxButtonGroup.name, IxButtonGroup)
}

export { IxButton, IxButtonGroup }

export type {
  ButtonComponent,
  ButtonProps,
  ButtonMode,
  ButtonShape,
  ButtonGroupComponent,
  ButtonGroupProps,
} from './src/types'

export type { ButtonSize } from '@idux/components/config'
