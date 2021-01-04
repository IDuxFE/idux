import type { App } from 'vue'
import { IxButton, IxButtonGroup } from './button'
import { IxIcon } from './icon'
import { IxEmpty } from './empty'
import { IxBadge } from './badge'
import { IxDivider } from './divider'
import { IxImage } from './image'
import { IxSpin } from './spin'

const components = [IxButton, IxButtonGroup, IxIcon, IxBadge, IxDivider, IxImage, IxSpin, IxEmpty]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

const version = '0.0.0'

export default {
  install,
  version,
}

export * from './core/config'
export * from './core/types'
export * from './button'
export * from './i18n'
export * from './icon'
export * from './empty'
export * from './badge'
export * from './divider'
export * from './image'
export * from './spin'
