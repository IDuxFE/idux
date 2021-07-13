import type { App, DefineComponent, Directive, Plugin } from 'vue'

// import General
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { IxHeader } from '@idux/components/header'
import { IxTag } from '@idux/components/tag'
import { IxTypography } from '@idux/components/typography'
// import Layout
import { IxDivider } from '@idux/components/divider'
import { IxSpace } from '@idux/components/space'
import { IxRow, IxCol } from '@idux/components/grid'
// import Navigation
import { IxPagination } from '@idux/components/pagination'
import { IxAffix } from '@idux/components/affix'
import { IxDropdown, IxDropdownButton } from '@idux/components/dropdown'
import { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuDivider, IxSubMenu } from '@idux/components/menu'
// import Data Entry
import { IxForm, IxFormItem, IxFormWrapper } from '@idux/components/form'
import { IxCheckbox, IxCheckboxGroup } from '@idux/components/checkbox'
import { IxInput, IxTextarea } from '@idux/components/input'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'
import { IxRate } from '@idux/components/rate'
import { IxSelect, IxOption, IxOptionGroup } from '@idux/components/select'
import { IxSwitch } from '@idux/components/switch'
// import Data Display
import { IxAvatar } from '@idux/components/avatar'
import { IxCollapse, IxCollapsePanel } from '@idux/components/collapse'
import { IxSteps, IxStep } from '@idux/components/steps'
import { IxBadge } from '@idux/components/badge'
import { IxCard } from '@idux/components/card'
import { IxList, IxListItem } from '@idux/components/list'
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
import { IxMessage, IxMessageProvider } from '@idux/components/message'
import { IxModal, IxModalProvider } from '@idux/components/modal'

// import Other
import { IxBackTop } from '@idux/components/back-top'
import { IxAnchor, IxAnchorLink } from '@idux/components/anchor'
// --- import end ---

const components = [
  // components General
  IxButton,
  IxButtonGroup,
  IxIcon,
  IxHeader,
  IxTag,
  // components Layout
  IxDivider,
  IxSpace,
  IxRow,
  IxCol,
  // components Navigation
  IxPagination,
  IxAffix,
  IxDropdown,
  IxDropdownButton,
  IxMenu,
  IxMenuItem,
  IxMenuItemGroup,
  IxMenuDivider,
  IxSubMenu,
  // components Data Entry
  IxForm,
  IxFormItem,
  IxFormWrapper,
  IxCheckbox,
  IxCheckboxGroup,
  IxInput,
  IxTextarea,
  IxRadio,
  IxRadioGroup,
  IxRate,
  IxSelect,
  IxOption,
  IxOptionGroup,
  IxSwitch,
  // components Data Display
  IxAvatar,
  IxCollapse,
  IxCollapsePanel,
  IxSteps,
  IxStep,
  IxBadge,
  IxList,
  IxListItem,
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
  IxMessage,
  IxMessageProvider,
  IxModal,
  IxModalProvider,
  // components Other
  IxBackTop,
  IxAnchor,
  IxAnchorLink,
  // --- components end ---
] as DefineComponent[]

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

const plugins: Plugin[] = []

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
