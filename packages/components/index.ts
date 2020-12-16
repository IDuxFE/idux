import type { App } from 'vue'
import { Button, ButtonGroup } from './button'
import { Icon } from './icon'

const version = '0.0.0'

const components = [Button, ButtonGroup, Icon]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  version,
  install,
}

export * from './core/config'
export * from './core/types'

export * from './button'
export { Icon } from './icon'
export type { IconComponent, IconDefinition } from './icon'
