import type { App, Directive } from 'vue'
import { IxButton, IxButtonGroup } from './button'
import { IxIcon } from './icon'
import { IxBadge } from './badge'
import { IxDivider } from './divider'
import { IxImage } from './image'
import { IxSpin } from './spin'
import { IxSpace } from './space'
import { IxEmpty } from './empty'
import { IxResult } from './result'
import { IxTypography } from './typography'
import { IxRate } from './rate'
import { IxCheckbox, IxCheckboxGroup } from './checkbox'

const components = [
  IxButton,
  IxButtonGroup,
  IxIcon,
  IxBadge,
  IxDivider,
  IxImage,
  IxSpin,
  IxSpace,
  IxEmpty,
  IxResult,
  IxRate,
  IxCheckbox,
  IxCheckboxGroup,
]

const directives: Record<string, Directive> = {
  typography: IxTypography,
}

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
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
export { IxEmpty }
export { IxResult }
export { IxTypography }
export { IxRate }
export { IxCheckbox, IxCheckboxGroup }
