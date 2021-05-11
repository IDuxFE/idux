import type { App, Directive } from 'vue'

// import General
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { IxTitle } from '@idux/components/title'
import { IxTag } from '@idux/components/tag'
import { IxTypography } from '@idux/components/typography'
// import Layout
import { IxDivider } from '@idux/components/divider'
import { IxSpace } from '@idux/components/space'
import { IxRow, IxCol } from '@idux/components/grid'
// import Navigation
import { IxAffix } from '@idux/components/affix'
import { IxDropdown, IxDropdownButton } from '@idux/components/dropdown'
import { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxSubMenu } from '@idux/components/menu'
// import Data Entry
import { IxCheckbox, IxCheckboxGroup } from '@idux/components/checkbox'
import { IxInput, IxTextarea } from '@idux/components/input'
import { IxRadio, IxRadioButton, IxRadioGroup } from '@idux/components/radio'
import { IxRate } from '@idux/components/rate'
import { IxSelect, IxOption, IxOptionGroup } from '@idux/components/select'
import { IxSwitch } from '@idux/components/switch'
// import Data Display
import { IxCollapse, IxCollapsePanel } from '@idux/components/collapse'
import { IxSteps, IxStep } from '@idux/components/steps'
import { IxBadge } from '@idux/components/badge'
import { IxCard } from '@idux/components/card'
import { IxEmpty } from '@idux/components/empty'
import { IxImage } from '@idux/components/image'
import { IxStatistic } from '@idux/components/statistic'
import { IxTimeline, IxTimelineItem } from '@idux/components/timeline'
import { IxTooltip } from '@idux/components/tooltip'
import { IxPopover } from '@idux/components/popover'
// import Feedback
import { IxResult } from '@idux/components/result'
import { IxSpin } from '@idux/components/spin'
import { IxProgress } from '@idux/components/progress'
import { IxMessage } from '@idux/components/message'
// import Other
import { IxBackTop } from '@idux/components/back-top'
import { IxAnchor, IxLink } from '@idux/components/anchor'
// --- import end ---

const components = [
  // components General
  IxButton,
  IxButtonGroup,
  IxIcon,
  IxTitle,
  IxTag,
  // components Layout
  IxDivider,
  IxSpace,
  IxRow,
  IxCol,
  // components Navigation
  IxAffix,
  IxDropdown,
  IxDropdownButton,
  IxMenu,
  IxMenuItem,
  IxMenuItemGroup,
  IxMenuDivider,
  IxSubMenu,
  // components Data Entry
  IxCheckbox,
  IxCheckboxGroup,
  IxInput,
  IxTextarea,
  IxRadio,
  IxRadioButton,
  IxRadioGroup,
  IxRate,
  IxSelect,
  IxOption,
  IxOptionGroup,
  IxSwitch,
  // components Data Display
  IxCollapse,
  IxCollapsePanel,
  IxSteps,
  IxStep,
  IxBadge,
  IxCard,
  IxEmpty,
  IxImage,
  IxStatistic,
  IxTimeline,
  IxTimelineItem,
  IxTooltip,
  IxPopover,
  // components Feedback
  IxResult,
  IxSpin,
  IxProgress,
  // components Other
  IxBackTop,
  IxAnchor,
  IxLink,
  // --- components end ---
]

const directives: Record<string, Directive> = {
  // directives General
  typography: IxTypography,
  // directives Layout
  // directives Navigation
  // directives Data Entry
  // directives Data Display
  // directives Feedback
  // directives Other
  // --- directives end ---
}

const plugins = [IxMessage]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })

  plugins.forEach(plugin => {
    app.use(plugin)
  })
}

export default { install }
