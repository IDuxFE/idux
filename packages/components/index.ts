/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { App, Directive } from 'vue'

import { IxAffix } from '@idux/components/affix'
import { IxAlert } from '@idux/components/alert'
import { IxAnchor, IxAnchorLink } from '@idux/components/anchor'
import { IxAvatar } from '@idux/components/avatar'
import { IxBackTop } from '@idux/components/back-top'
import { IxBadge } from '@idux/components/badge'
import { IxBreadcrumb, IxBreadcrumbItem } from '@idux/components/breadcrumb'
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxCard, IxCardGrid } from '@idux/components/card'
import { IxCarousel } from '@idux/components/carousel'
import { IxCascader } from '@idux/components/cascader'
import { IxCheckbox, IxCheckboxGroup } from '@idux/components/checkbox'
import { IxCollapse, IxCollapsePanel } from '@idux/components/collapse'
import { IxComment } from '@idux/components/comment'
import { IxDatePanel, IxDatePicker, IxDateRangePanel, IxDateRangePicker } from '@idux/components/date-picker'
import { IxDivider } from '@idux/components/divider'
import { IxDrawer, IxDrawerProvider } from '@idux/components/drawer'
import { IxDropdown } from '@idux/components/dropdown'
import { IxEmpty } from '@idux/components/empty'
import { IxForm, IxFormItem, IxFormWrapper } from '@idux/components/form'
import { IxCol, IxRow } from '@idux/components/grid'
import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'
import { IxImage, IxImageViewer } from '@idux/components/image'
import { IxInput } from '@idux/components/input'
import { IxInputNumber } from '@idux/components/input-number'
import { IxLayout, IxLayoutContent, IxLayoutFooter, IxLayoutHeader, IxLayoutSider } from '@idux/components/layout'
import { IxList, IxListItem } from '@idux/components/list'
import { IxMenu, IxMenuDivider, IxMenuItem, IxMenuItemGroup, IxMenuSub } from '@idux/components/menu'
import { IxMessage, IxMessageProvider } from '@idux/components/message'
import { IxModal, IxModalProvider } from '@idux/components/modal'
import { IxNotification, IxNotificationProvider } from '@idux/components/notification'
import { IxPagination } from '@idux/components/pagination'
import { IxPopconfirm } from '@idux/components/popconfirm'
import { IxPopover } from '@idux/components/popover'
import { IxProgress } from '@idux/components/progress'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'
import { IxRate } from '@idux/components/rate'
import { IxResult } from '@idux/components/result'
import { IxSelect, IxSelectOption, IxSelectOptionGroup, IxSelectPanel } from '@idux/components/select'
import { IxSkeleton } from '@idux/components/skeleton'
import { IxSlider } from '@idux/components/slider'
import { IxSpace } from '@idux/components/space'
import { IxSpin } from '@idux/components/spin'
import { IxStatistic } from '@idux/components/statistic'
import { IxStepper, IxStepperItem } from '@idux/components/stepper'
import { IxSwitch } from '@idux/components/switch'
import { IxTable, IxTableColumn } from '@idux/components/table'
import { IxTab, IxTabs } from '@idux/components/tabs'
import { IxTag, IxTagGroup } from '@idux/components/tag'
import { IxTextarea } from '@idux/components/textarea'
import { IxTimePicker, IxTimeRangePicker } from '@idux/components/time-picker'
import { IxTimeline, IxTimelineItem } from '@idux/components/timeline'
import { IxTooltip } from '@idux/components/tooltip'
import { IxTransfer } from '@idux/components/transfer'
import { IxTree } from '@idux/components/tree'
import { IxTreeSelect } from '@idux/components/tree-select'
import { IxTypography } from '@idux/components/typography'
import { IxUpload, IxUploadFiles } from '@idux/components/upload'
import { version } from '@idux/components/version'
import { IxWatermark } from '@idux/components/watermark'

const components = [
  IxAffix,
  IxAlert,
  IxAnchor,
  IxAnchorLink,
  IxAvatar,
  IxBackTop,
  IxBadge,
  IxBreadcrumb,
  IxBreadcrumbItem,
  IxButton,
  IxButtonGroup,
  IxCard,
  IxCardGrid,
  IxCarousel,
  IxCascader,
  IxComment,
  IxCheckbox,
  IxCheckboxGroup,
  IxCollapse,
  IxCollapsePanel,
  IxDatePicker,
  IxDatePanel,
  IxDateRangePicker,
  IxDateRangePanel,
  IxDivider,
  IxDrawer,
  IxDrawerProvider,
  IxDropdown,
  IxEmpty,
  IxForm,
  IxFormItem,
  IxFormWrapper,
  IxCol,
  IxRow,
  IxHeader,
  IxIcon,
  IxImage,
  IxImageViewer,
  IxInput,
  IxInputNumber,
  IxLayout,
  IxLayoutContent,
  IxLayoutFooter,
  IxLayoutHeader,
  IxLayoutSider,
  IxList,
  IxListItem,
  IxMenu,
  IxMenuDivider,
  IxMenuItem,
  IxMenuItemGroup,
  IxMenuSub,
  IxMessage,
  IxMessageProvider,
  IxModal,
  IxModalProvider,
  IxNotification,
  IxNotificationProvider,
  IxPagination,
  IxPopconfirm,
  IxPopover,
  IxProgress,
  IxRadio,
  IxRadioGroup,
  IxRate,
  IxResult,
  IxSelect,
  IxSelectPanel,
  IxSelectOption,
  IxSelectOptionGroup,
  IxSkeleton,
  IxSlider,
  IxSpace,
  IxSpin,
  IxStatistic,
  IxStepper,
  IxStepperItem,
  IxSwitch,
  IxTable,
  IxTableColumn,
  IxTab,
  IxTabs,
  IxTag,
  IxTagGroup,
  IxTextarea,
  IxTimePicker,
  IxTimeRangePicker,
  IxTransfer,
  IxTimeline,
  IxTimelineItem,
  IxTooltip,
  IxTree,
  IxTreeSelect,
  IxUpload,
  IxUploadFiles,
  IxWatermark,
]

const directives: Record<string, Directive> = {
  typography: IxTypography,
}

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.displayName ?? component.name, component)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })
}

const installer = { install, version }

export default installer
export { install }

export * from '@idux/components/affix'
export * from '@idux/components/alert'
export * from '@idux/components/anchor'
export * from '@idux/components/avatar'
export * from '@idux/components/back-top'
export * from '@idux/components/badge'
export * from '@idux/components/breadcrumb'
export * from '@idux/components/button'
export * from '@idux/components/card'
export * from '@idux/components/carousel'
export * from '@idux/components/cascader'
export * from '@idux/components/checkbox'
export * from '@idux/components/collapse'
export * from '@idux/components/comment'
export * from '@idux/components/config'
export * from '@idux/components/date-picker'
export * from '@idux/components/divider'
export * from '@idux/components/drawer'
export * from '@idux/components/dropdown'
export * from '@idux/components/empty'
export * from '@idux/components/form'
export * from '@idux/components/grid'
export * from '@idux/components/header'
export * from '@idux/components/icon'
export * from '@idux/components/image'
export * from '@idux/components/input'
export * from '@idux/components/input-number'
export * from '@idux/components/layout'
export * from '@idux/components/list'
export * from '@idux/components/locales'
export * from '@idux/components/menu'
export * from '@idux/components/message'
export * from '@idux/components/modal'
export * from '@idux/components/notification'
export * from '@idux/components/pagination'
export * from '@idux/components/popconfirm'
export * from '@idux/components/popover'
export * from '@idux/components/progress'
export * from '@idux/components/radio'
export * from '@idux/components/rate'
export * from '@idux/components/result'
export * from '@idux/components/select'
export * from '@idux/components/skeleton'
export * from '@idux/components/slider'
export * from '@idux/components/space'
export * from '@idux/components/spin'
export * from '@idux/components/statistic'
export * from '@idux/components/stepper'
export * from '@idux/components/switch'
export * from '@idux/components/table'
export * from '@idux/components/tabs'
export * from '@idux/components/tag'
export * from '@idux/components/textarea'
export * from '@idux/components/time-picker'
export * from '@idux/components/timeline'
export * from '@idux/components/tooltip'
export * from '@idux/components/transfer'
export * from '@idux/components/tree'
export * from '@idux/components/tree-select'
export * from '@idux/components/typography'
export * from '@idux/components/upload'
export * from '@idux/components/version'
export * from '@idux/components/watermark'
