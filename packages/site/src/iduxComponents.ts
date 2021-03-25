import type { App, Directive } from 'vue'

// General
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { IxTitle } from '@idux/components/title'
import { IxTypography } from '@idux/components/typography'
// Layout
import { IxDivider } from '@idux/components/divider'
import { IxSpace } from '@idux/components/space'
import { IxRow, IxCol } from '@idux/components/grid'
// Navigation
import { IxAffix } from '@idux/components/affix'
// Data Entry
import { IxCheckbox, IxCheckboxGroup } from '@idux/components/checkbox'
import { IxInput, IxTextarea } from '@idux/components/input'
import { IxRate } from '@idux/components/rate'
import { IxSwitch } from '@idux/components/switch'
// Data Display
import { IxBadge } from '@idux/components/badge'
import { IxCard } from '@idux/components/card'
import { IxEmpty } from '@idux/components/empty'
import { IxImage } from '@idux/components/image'
import { IxStatistic } from '@idux/components/statistic'
import { IxTimeline, IxTimelineItem } from '@idux/components/timeline'
import { IxTooltip } from '@idux/components/tooltip'
import { IxPopover } from '@idux/components/popover'
// Feedback
import { IxResult } from '@idux/components/result'
import { IxSpin } from '@idux/components/spin'
import { IxProgress } from '@idux/components/progress'
// Other
import { IxBackTop } from '@idux/components/back-top'
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
  IxSwitch,
  // Data Display
  IxBadge,
  IxCard,
  IxEmpty,
  IxImage,
  IxStatistic,
  IxTimeline,
  IxTimelineItem,
  IxTooltip,
  IxPopover,
  // Feedback
  IxResult,
  IxSpin,
  IxProgress,
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

export default { install }
