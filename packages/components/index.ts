import type { App } from 'vue'
import { Button, ButtonGroup } from './button'

const version = '0.0.0'

const components = [Button, ButtonGroup]

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
