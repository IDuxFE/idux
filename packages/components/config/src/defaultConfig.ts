/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  AlertConfig,
  AnchorConfig,
  AvatarConfig,
  BackTopConfig,
  BadgeConfig,
  CardConfig,
  CarouselConfig,
  CheckboxConfig,
  CollapseConfig,
  CommonConfig,
  DatePickerConfig,
  DateRangePickerConfig,
  DividerConfig,
  DrawerConfig,
  DropdownConfig,
  EmptyConfig,
  FormConfig,
  GlobalConfig,
  IconConfig,
  ImageConfig,
  ImageViewerConfig,
  InputConfig,
  InputNumberConfig,
  ListConfig,
  MenuConfig,
  MessageConfig,
  ModalConfig,
  NotificationConfig,
  PaginationConfig,
  PopconfirmConfig,
  PopoverConfig,
  ProgressConfig,
  RadioConfig,
  RateConfig,
  ResultConfig,
  RowConfig,
  SelectConfig,
  SkeletonConfig,
  SpaceConfig,
  SpinConfig,
  StatisticConfig,
  StepperConfig,
  TableConfig,
  TagConfig,
  TextareaConfig,
  TimePickerConfig,
  TimeRangePickerConfig,
  TooltipConfig,
  TreeConfig,
  TreeSelectConfig,
} from './types'

import { numFormatter } from './numFormatter'

// --------------------- Common ---------------------
const common: CommonConfig = { prefixCls: 'ix' }

// --------------------- General ---------------------

const icon: IconConfig = {}

const tag: TagConfig = {}

// --------------------- Layout ---------------------
const divider: DividerConfig = {
  dashed: false,
  plain: false,
  position: 'center',
  type: 'horizontal',
}

const space: SpaceConfig = { size: 'sm', wrap: true }

const row: RowConfig = { wrap: true }

// --------------------- Navigation ---------------------
const dropdown: DropdownConfig = {
  autoAdjust: true,
  destroyOnHide: false,
  offset: [0, 8],
  placement: 'bottomStart',
  showArrow: false,
  trigger: 'hover',
}

const menu: MenuConfig = {
  indent: 24,
  offset: [0, 8],
  suffix: 'right',
  theme: 'light',
}

const pagination: PaginationConfig = {
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  showQuickJumper: false,
  showSizeChanger: false,
  showTitle: true,
  showTotal: true,
  simple: false,
  size: 'md',
}

// --------------------- Data Entry ---------------------
const form: FormConfig = {
  colonless: false,
  labelAlign: 'end',
  layout: 'horizontal',
  size: 'md',
}

const checkbox: CheckboxConfig = { size: 'md' }

const datePicker: DatePickerConfig = {
  allowInput: true,
  borderless: false,
  clearable: false,
  clearIcon: 'close-circle',
  size: 'md',
  suffix: 'calendar',
}

const dateRangePicker: DateRangePickerConfig = { separator: 'swap-right' }

const inputNumber: InputNumberConfig = {
  keyboard: true,
  size: 'md',
}

const input: InputConfig = {
  borderless: false,
  clearable: false,
  clearIcon: 'close-circle',
  size: 'md',
}

const rate: RateConfig = {
  allowHalf: false,
  clearable: false,
  count: 5,
  icon: 'star-filled',
  size: 'md',
}

const radio: RadioConfig = {
  size: 'md',
}

const select: SelectConfig = {
  borderless: false,
  childrenKey: 'children',
  labelKey: 'label',
  size: 'md',
  suffix: 'down',
  valueKey: 'value',
}

const textarea: TextareaConfig = {
  autoRows: false,
  clearable: false,
  clearIcon: 'close-circle',
  resize: 'vertical',
  showCount: false,
  size: 'md',
}

const timePicker: TimePickerConfig = {
  borderless: false,
  clearable: true,
  clearIcon: 'close-circle',
  size: 'md',
  suffix: 'clock-circle',
  allowInput: true,
  format: 'HH:mm:ss',
}

const timeRangePicker: TimeRangePickerConfig = {
  borderless: false,
  clearable: true,
  clearIcon: 'close-circle',
  size: 'md',
  suffix: 'clock-circle',
  allowInput: true,
  format: 'HH:mm:ss',
}

const treeSelect: TreeSelectConfig = {
  size: 'md',
  suffix: 'down',
  childrenKey: 'children',
  labelKey: 'label',
  nodeKey: 'key',
}

// --------------------- Data Display ---------------------
const avatar: AvatarConfig = {
  gap: 4,
  icon: 'user',
  shape: 'circle',
  size: 'md',
}

const badge: BadgeConfig = { showZero: false, dot: false, overflowCount: 99 }

const card: CardConfig = {
  borderless: false,
  hoverable: false,
  size: 'md',
}

const empty: EmptyConfig = {
  icon: 'empty',
}

const list: ListConfig = {
  size: 'md',
  borderless: true,
}

const collapse: CollapseConfig = {
  accordion: false,
  borderless: false,
  expandIcon: 'right',
  ghost: false,
}

const image: ImageConfig = {
  preview: true,
}

const imageViewer: ImageViewerConfig = {
  loop: true,
  maskClosable: true,
  zoom: [0.5, 2],
}

const statistic: StatisticConfig = {
  precision: 0,
  formatter: numFormatter,
}

const table: TableConfig = {
  borderless: true,
  rowKey: 'key',
  size: 'md',

  extra: { icon: 'ellipsis' },
  pagination: { position: 'bottomEnd' },

  columnBase: {
    align: 'start',
    sortable: { nextTooltip: false, orders: ['ascend', 'descend'] },
    filterable: { multiple: true, footer: true },
  },
  columnExpandable: { icon: 'right' },
}

const tooltip: TooltipConfig = {
  autoAdjust: true,
  delay: 100,
  destroyOnHide: false,
  placement: 'top',
  trigger: 'hover',
}

const tree: TreeConfig = {
  blocked: false,
  expandIcon: 'right',
  nodeKey: 'key',
  showLine: false,
}

const popover: PopoverConfig = {
  autoAdjust: true,
  delay: 100,
  destroyOnHide: false,
  placement: 'top',
  showArrow: true,
  trigger: 'hover',
  closeIcon: 'close',
}

// --------------------- Feedback ---------------------
const message: MessageConfig = {
  destroyOnHover: false,
  duration: 3000,
  maxCount: 5,
}

const notification: NotificationConfig = {
  destroyOnHover: false,
  duration: 4500,
  maxCount: 5,
  offset: 24,
  placement: 'topEnd',
}

const modal: ModalConfig = {
  centered: false,
  closable: true,
  closeIcon: 'close',
  closeOnEsc: true,
  mask: true,
  maskClosable: true,
  width: 520,
}

const alert: AlertConfig = {
  closable: false,
  icon: {
    success: 'check-circle',
    error: 'info-circle',
    info: 'bulb',
    warning: 'exclamation-circle',
  },
}

const skeleton: SkeletonConfig = {
  animated: true,
}

const carousel: CarouselConfig = {
  autoplayTime: 0,
  dotPlacement: 'bottom',
  showArrow: false,
  trigger: 'click',
}

const drawer: DrawerConfig = {
  closable: true,
  closeOnEsc: true,
  closeIcon: 'close',
  height: 256,
  mask: true,
  maskClosable: true,
  width: 480,
}

const result: ResultConfig = { status: 'info' }

const spin: SpinConfig = {
  icon: 'loading',
  tip: '',
  tipAlign: 'vertical',
  size: 'sm',
}

const popconfirm: PopconfirmConfig = {
  autoAdjust: true,
  delay: 100,
  destroyOnHide: false,
  placement: 'top',
  trigger: 'click',
}

const progress: ProgressConfig = {
  strokeLinecap: 'round',
  size: 'md',
  format: (percent: number) => percent + '%',
}

const stepper: StepperConfig = {
  size: 'md',
}

// --------------------- Other ---------------------
const backTop: BackTopConfig = {
  duration: 450,
  visibilityHeight: 400,
}
const anchor: AnchorConfig = {
  bounds: 5,
  hideLinkBall: false,
}
// --------------------- end ---------------------

export const defaultConfig: GlobalConfig = {
  // Common
  common,
  // General
  icon,
  tag,
  // Layout
  divider,
  space,
  row,
  // Navigation
  dropdown,
  menu,
  pagination,
  // Data Entry
  form,
  checkbox,
  datePicker,
  dateRangePicker,
  input,
  inputNumber,
  rate,
  radio,
  select,
  textarea,
  timePicker,
  timeRangePicker,
  treeSelect,
  // Data Display
  avatar,
  badge,
  card,
  empty,
  carousel,
  list,
  collapse,
  image,
  imageViewer,
  statistic,
  table,
  tooltip,
  tree,
  popover,
  // Feedback
  alert,
  skeleton,
  message,
  notification,
  modal,
  drawer,
  result,
  spin,
  progress,
  popconfirm,
  stepper,
  // Other
  backTop,
  anchor,
  // --- end ---
}
