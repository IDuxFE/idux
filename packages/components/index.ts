import type { App } from 'vue'
import { IxButton, IxButtonGroup } from './button'
import { IxIcon } from './icon'
import { IxBadge } from './badge'
import { IxDivider } from './divider'
import { IxImage } from './image'
import { IxSpin } from './spin'
import { IxSpace } from './space'
import { IxCard } from './card'

const components = [IxButton, IxButtonGroup, IxIcon, IxBadge, IxDivider, IxImage, IxSpin, IxSpace, IxCard]

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

export { useGlobalConfig } from './core/config'
export { useLocale, addLocale, getLocale } from './i18n'
export { IxButton, IxButtonGroup }
export { IxIcon }
export { IxBadge }
export { IxDivider }
export { IxImage }
export { IxSpin }
export { IxSpace }
export { IxCard }
