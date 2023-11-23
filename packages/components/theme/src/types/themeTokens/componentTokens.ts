/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AlertThemeTokens } from '@idux/components/alert'
import type { AnchorThemeTokens } from '@idux/components/anchor'
import type { AvatarThemeTokens } from '@idux/components/avatar'
import type { BackTopThemeTokens } from '@idux/components/back-top'
import type { BadgeThemeTokens } from '@idux/components/badge'
import type { BreadcrumbThemeTokens } from '@idux/components/breadcrumb'
import type { ButtonThemeTokens } from '@idux/components/button'
import type { CardThemeTokens } from '@idux/components/card'
import type { CarouselThemeTokens } from '@idux/components/carousel'
import type { CascaderThemeTokens } from '@idux/components/cascader'
import type { CheckboxThemeTokens } from '@idux/components/checkbox'
import type { CollapseThemeTokens } from '@idux/components/collapse'
import type { CommentThemeTokens } from '@idux/components/comment'
import type { DatePickerThemeTokens } from '@idux/components/date-picker'
import type { DescThemeTokens } from '@idux/components/desc'
import type { DividerThemeTokens } from '@idux/components/divider'
import type { DrawerThemeTokens } from '@idux/components/drawer'
import type { DropdownThemeTokens } from '@idux/components/dropdown'
import type { EmptyThemeTokens } from '@idux/components/empty'
import type { FormThemeTokens } from '@idux/components/form'
import type { HeaderThemeTokens } from '@idux/components/header'
import type { ImageThemeTokens } from '@idux/components/image'
import type { LayoutThemeTokens } from '@idux/components/layout'
import type { LoadingBarThemeTokens } from '@idux/components/loading-bar'
import type { MenuThemeTokens } from '@idux/components/menu'
import type { MessageThemeTokens } from '@idux/components/message'
import type { ModalThemeTokens } from '@idux/components/modal'
import type { NotificationThemeTokens } from '@idux/components/notification'
import type { PaginationThemeTokens } from '@idux/components/pagination'
import type { PopconfirmThemeTokens } from '@idux/components/popconfirm'
import type { PopoverThemeTokens } from '@idux/components/popover'
import type { ProgressThemeTokens } from '@idux/components/progress'
import type { RadioThemeTokens } from '@idux/components/radio'
import type { RateThemeTokens } from '@idux/components/rate'
import type { ResultThemeTokens } from '@idux/components/result'
import type { SelectThemeTokens } from '@idux/components/select'
import type { SkeletonThemeTokens } from '@idux/components/skeleton'
import type { SliderThemeTokens } from '@idux/components/slider'
import type { SpaceThemeTokens } from '@idux/components/space'
import type { SpinThemeTokens } from '@idux/components/spin'
import type { StatisticThemeTokens } from '@idux/components/statistic'
import type { StepperThemeTokens } from '@idux/components/stepper'
import type { SwitchThemeTokens } from '@idux/components/switch'
import type { TableThemeTokens } from '@idux/components/table'
import type { TabsThemeTokens } from '@idux/components/tabs'
import type { TagThemeTokens } from '@idux/components/tag'
import type { TextareaThemeTokens } from '@idux/components/textarea'
import type { TimePickerThemeTokens } from '@idux/components/time-picker'
import type { TimelineThemeTokens } from '@idux/components/timeline'
import type { TooltipThemeTokens } from '@idux/components/tooltip'
import type { TourThemeTokens } from '@idux/components/tour'
import type { TransferThemeTokens } from '@idux/components/transfer'
import type { TreeThemeTokens } from '@idux/components/tree'
import type { TreeSelectThemeTokens } from '@idux/components/tree-select'
import type { UploadThemeTokens } from '@idux/components/upload'

export type ComponentThemeTokens = {
  anchor: AnchorThemeTokens
  avatar: AvatarThemeTokens
  alert: AlertThemeTokens
  button: ButtonThemeTokens
  backTop: BackTopThemeTokens
  badge: BadgeThemeTokens
  breadcrumb: BreadcrumbThemeTokens
  checkbox: CheckboxThemeTokens
  card: CardThemeTokens
  carousel: CarouselThemeTokens
  collapse: CollapseThemeTokens
  comment: CommentThemeTokens
  cascader: CascaderThemeTokens
  datePicker: DatePickerThemeTokens
  desc: DescThemeTokens
  divider: DividerThemeTokens
  drawer: DrawerThemeTokens
  dropdown: DropdownThemeTokens
  empty: EmptyThemeTokens
  form: FormThemeTokens
  header: HeaderThemeTokens
  image: ImageThemeTokens
  loadingBar: LoadingBarThemeTokens
  layout: LayoutThemeTokens
  menu: MenuThemeTokens
  message: MessageThemeTokens
  modal: ModalThemeTokens
  notification: NotificationThemeTokens
  popover: PopoverThemeTokens
  popconfirm: PopconfirmThemeTokens
  pagination: PaginationThemeTokens
  progress: ProgressThemeTokens
  radio: RadioThemeTokens
  rate: RateThemeTokens
  result: ResultThemeTokens
  space: SpaceThemeTokens
  spin: SpinThemeTokens
  switch: SwitchThemeTokens
  slider: SliderThemeTokens
  skeleton: SkeletonThemeTokens
  statistic: StatisticThemeTokens
  stepper: StepperThemeTokens
  select: SelectThemeTokens
  textarea: TextareaThemeTokens
  transfer: TransferThemeTokens
  timePicker: TimePickerThemeTokens
  tooltip: TooltipThemeTokens
  tag: TagThemeTokens
  timeline: TimelineThemeTokens
  tabs: TabsThemeTokens
  table: TableThemeTokens
  tour: TourThemeTokens
  tree: TreeThemeTokens
  treeSelect: TreeSelectThemeTokens
  upload: UploadThemeTokens
}

export type ComponentThemeKeys = keyof ComponentThemeTokens
