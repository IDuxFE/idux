import type { App } from 'vue'
import { IxButton, IxButtonGroup } from './button'
import { IxIcon } from './icon'

const version = '0.0.0'

const components = [IxButton, IxButtonGroup, IxIcon]

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
export * from './i18n'
export * from './icon'
