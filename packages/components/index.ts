/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { App, Directive } from 'vue'

import { IxAffix } from '@idux/components/affix'
import { IxAnchor, IxAnchorLink } from '@idux/components/anchor'
import { IxAvatar } from '@idux/components/avatar'
import { IxBackTop } from '@idux/components/back-top'
import { IxBadge } from '@idux/components/badge'
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxCard } from '@idux/components/card'
import { IxCheckbox, IxCheckboxGroup } from '@idux/components/checkbox'
import { IxCollapse, IxCollapsePanel } from '@idux/components/collapse'
import { IxDivider } from '@idux/components/divider'
import { IxDrawer } from '@idux/components/drawer'
import { IxDropdown } from '@idux/components/dropdown'
import { IxEmpty } from '@idux/components/empty'
import { IxForm, IxFormItem, IxFormWrapper } from '@idux/components/form'
import { IxCol, IxRow } from '@idux/components/grid'
import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'
import { IxImage } from '@idux/components/image'
import { IxInput } from '@idux/components/input'
import { IxLayout, IxLayoutContent, IxLayoutFooter, IxLayoutHeader, IxLayoutSider } from '@idux/components/layout'
import { IxList, IxListItem } from '@idux/components/list'
import { IxMenu, IxMenuDivider, IxMenuItem, IxMenuItemGroup, IxMenuSub } from '@idux/components/menu'
import { IxMessage, IxMessageProvider } from '@idux/components/message'
import { IxModal, IxModalProvider } from '@idux/components/modal'
import { IxPagination } from '@idux/components/pagination'
import { IxPopover } from '@idux/components/popover'
import { IxProgress } from '@idux/components/progress'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'
import { IxRate } from '@idux/components/rate'
import { IxResult } from '@idux/components/result'
import { IxSelect, IxSelectOption, IxSelectOptionGroup } from '@idux/components/select'
import { IxSpace } from '@idux/components/space'
import { IxSpin } from '@idux/components/spin'
import { IxStatistic } from '@idux/components/statistic'
import { IxStepper, IxStepperItem } from '@idux/components/stepper'
import { IxSwitch } from '@idux/components/switch'
import { IxTable } from '@idux/components/table'
import { IxTag } from '@idux/components/tag'
import { IxTextarea } from '@idux/components/textarea'
import { IxTimePicker } from '@idux/components/time-picker'
import { IxTimeline, IxTimelineItem } from '@idux/components/timeline'
import { IxTooltip } from '@idux/components/tooltip'
import { IxTree } from '@idux/components/tree'
import { IxTypography } from '@idux/components/typography'
import { version } from '@idux/components/version'

const components = [
  IxButton,
  IxButtonGroup,
  IxIcon,
  IxHeader,
  IxTag,
  IxLayout,
  IxLayoutHeader,
  IxLayoutSider,
  IxLayoutContent,
  IxLayoutFooter,
  IxDivider,
  IxSpace,
  IxRow,
  IxCol,
  IxPagination,
  IxAffix,
  IxDropdown,
  IxMenu,
  IxMenuItem,
  IxMenuItemGroup,
  IxMenuDivider,
  IxMenuSub,
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
  IxSelectOption,
  IxSelectOptionGroup,
  IxSwitch,
  IxTimePicker,
  IxTable,
  IxTree,
  IxAvatar,
  IxCollapse,
  IxCollapsePanel,
  IxStepper,
  IxStepperItem,
  IxList,
  IxListItem,
  IxBadge,
  IxCard,
  IxEmpty,
  IxImage,
  IxStatistic,
  IxTimeline,
  IxTimelineItem,
  IxTooltip,
  IxPopover,
  IxDrawer,
  IxMessage,
  IxMessageProvider,
  IxModal,
  IxModalProvider,
  IxResult,
  IxSpin,
  IxProgress,
  IxBackTop,
  IxAnchor,
  IxAnchorLink,
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

export default {
  install,
  version,
}
