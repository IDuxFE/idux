import type { App, Directive } from 'vue'

// General
import { IxButton, IxButtonGroup } from './button'
import { IxIcon } from './icon'
import { IxTitle } from './title'
import { IxTypography } from './typography'
// Layout
import { IxDivider } from './divider'
import { IxSpace } from './space'
import { IxRow, IxCol } from './grid'
// Navigation
import { IxAffix } from './affix'
// Data Entry
import { IxCheckbox, IxCheckboxGroup } from './checkbox'
import { IxInput, IxTextarea } from './input'
import { IxRate } from './rate'
// Data Display
import { IxBadge } from './badge'
import { IxCard } from './card'
import { IxEmpty } from './empty'
import { IxImage } from './image'
import { IxStatistic } from './statistic'
import { IxTimeline, IxTimelineItem } from './timeline'
import { IxTooltip } from './tooltip'
// Feedback
import { IxResult } from './result'
import { IxSpin } from './spin'
// Other
import { IxBackTop } from './back-top'
// --- import end ---

const components = [
  // General
  IxButton,
  IxButtonGroup,
  IxIcon,
  IxTitle,
  // Layout
  IxDivider,
  IxSpace,
  IxRow,
  IxCol,
  // Navigation
  IxAffix,
  // Data Entry
  IxCheckbox,
  IxCheckboxGroup,
  IxInput,
  IxTextarea,
  IxRate,
  // Data Display
  IxBadge,
  IxCard,
  IxEmpty,
  IxImage,
  IxStatistic,
  IxTimeline,
  IxTimelineItem,
  IxTooltip,
  // Feedback
  IxResult,
  IxSpin,
  // Other
  IxBackTop,
  // --- components end ---
]

const directives: Record<string, Directive> = {
  // General
  typography: IxTypography,
  // Layout
  // Navigation
  // Data Entry
  // Data Display
  // Feedback
  // Other
  // --- directives end ---
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
export {
  // General
  IxButton,
  IxButtonGroup,
  IxIcon,
  IxTitle,
  IxTypography,
  // Layout
  IxDivider,
  IxSpace,
  IxRow,
  IxCol,
  // Navigation
  IxAffix,
  // Data Entry
  IxCheckbox,
  IxCheckboxGroup,
  IxInput,
  IxTextarea,
  IxRate,
  // Data Display
  IxBadge,
  IxCard,
  IxEmpty,
  IxImage,
  IxStatistic,
  IxTimeline,
  IxTimelineItem,
  IxTooltip,
  // Feedback
  IxResult,
  IxSpin,
  // Other
  IxBackTop,
  // --- export end ---
}
export * from './message'
