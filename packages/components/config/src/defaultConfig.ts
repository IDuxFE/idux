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

const space: SpaceConfig = { gap: 8, wrap: true }

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
  lessJumper: false,
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
  width: 100,
  height: 100,
  fallback:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1OCAoODQ2NjMpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPjEyODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSI5OS42Mjc4NTA1JSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDBBQ0ZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzY2RkYiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJsaW5lYXJHcmFkaWVudC0yIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzFEQjgzRiIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNzJEMTNEIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9IjEyOCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTQ0LjQ2NzMxMjYsNjIuMjMyMTcwNSBMNzAuMTI5ODAxNSw4My43NjU1NTU0IEM2MC4xODk3NTEyLDk1LjYxMTY0NiA0Mi41Mjg1OTQ2LDk3LjE1Njc5NyAzMC42ODI1MDQsODcuMjE2NzQ2NyBMMjguMjQ4MTQ5Miw4NS4xNzM4OTc1IEMyMS4zMTIxMTA4LDc5LjMwODkyOTQgMTQuMzM1NDQzOSw3My40NTQ4NzE4IDcuMzE4MTQ4NDYsNjcuNjExNzI0NiBMOS4yNDY1MTEyOSw2NS4zMTM1OTEzIEMxMy44NDgzODY0LDU5LjgyOTI5MDEgMjAuMzAzNzUwNyw1Ni44MTc3Nzk2IDI2LjkyNzcxNzYsNTYuNDI2NDY4MyBMMjguMzQ5MTA1Nyw1Ni4zODI2OTk1IEMzNC4wNDAwNjg2LDU2LjM2ODg1MDQgMzkuNzY2NDgzLDU4LjI4NzcwNjEgNDQuNDY3MzEyNiw2Mi4yMzIxNzA1IFoiIGlkPSLot6/lvoQiIGZpbGw9IiMyMDRFRDkiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNOTUuNDM4MDk4NCw0NS4xMzQ1MDkgTDk3LjMzMTY2NTYsNDUuMjI3OTkzMiBMOTguNzAxMDU1OSw0NS4zNjI3MDcyIEwxMDAuNTE2MTI5LDQ1LjYyOTI5MTYgTDEwMS44OTEyODcsNDUuODk5NDE2NCBMMTAzLjQzNjU4NSw0Ni4yNzUwNzE5IEwxMDUuMTY5NDEsNDYuNzkwNDA1MSBMMTA2LjU4NzY2NSw0Ny4yODk1OTM3IEwxMDguMjEyNTY1LDQ3Ljk1MjAwNzQgTDEwOC45MzE3Niw0OC4yNzc2NDAxIEwxMDguOTMxNzYsNDguMjc3NjQwMSBMMTEwLjM1Mzg5OCw0OC45ODM2MzEgTDExMS44MDUxMjgsNDkuNzk0NjA0NSBMMTEzLjQ0MzE5OSw1MC44MzAxOTgxIEwxMTQuNjUzNDk2LDUxLjY4NTY5MTIgTDExNS44MjE1MjEsNTIuNTkyMTI3NSBMMTE3LjE4ODUzNyw1My43NjU3NjYgTDExOC40NzMyOTksNTQuOTk1MDg2NCBMMTE5LjUzMzEzLDU2LjExNTU4MDYgTDEyMC4wODg2Miw1Ni43NDY0NjgzIEwxMjAuMDg4NjIsNTYuNzQ2NDY4MyBMMTIxLjIwODAwMyw1OC4xMjIyMDA1IEwxMjIuMTMwNDY5LDU5LjM3NzQ1NiBMNzIuMjk3NDUzMyw5NC4yNzA5MDkyIEM2Ny41NzI1ODc4LDk3LjU3OTI5NTcgNjIuMTMzNTU1NCw5OS4zMTAyNzggNTYuNjY4NDkzMSw5OS40OTg0MDA0IEw1NS4wMjg4ODE3LDk5LjUwODU4NTggQzQ4LjQ3MjgxNzUsOTkuMzY0NDYwNyA0MS45NzgzNjIyLDk3LjAwMzU5MTYgMzYuNzM0NjE2NSw5Mi40ODU2NzA5IEwzMi43NjgwODE2LDg5LjAzMzg2MiBMMzIuNzY4MDgxNiw4OS4wMzM4NjIgTDI3LjYzNjUwMzksODQuNjQ2ODk0IEw3NS42Mzg0ODQ5LDUxLjE0MzQ2MzQgQzc3LjQ1OTY4NTEsNDkuODcyMzM5NyA3OS4zNjM0NjM3LDQ4LjgwNzg1NjQgODEuMzIxOTc2Miw0Ny45NDUwODIgTDgzLjI5NzM3NzksNDcuMTQ5NDc5OSBDODQuMzIzMzMxMSw0Ni43NzQwNzgyIDg1LjM2MTE5MzEsNDYuNDUxNzgxNSA4Ni40MDcyNTc2LDQ2LjE4MTg4MTUgTDg3Ljk4MjA0MzEsNDUuODE2MjQwMyBMODkuNjQ0MTg2Niw0NS41MTY1NyBMOTEuMzg1OTMwMyw0NS4yOTQ4NTUxIEw5My4wNTA0MjI4LDQ1LjE2OTM0MjMgQzkzLjg0NjY4MzIsNDUuMTI5Mjc1NyA5NC42NDMxMDY0LDQ1LjExNzc1ODggOTUuNDM4MDk4NCw0NS4xMzQ1MDkgWiIgaWQ9Iui3r+W+hCIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik01MS4zODg4NTIsMzIuNDY5NDc1OSBMNjMuNjQ1NTYzMSw0Mi43NTQwNzc2IEM1OC42NzU1MzgsNDguNjc3MTIyOSA0OS44NDQ5NTk3LDQ5LjQ0OTY5ODQgNDMuOTIxOTE0NCw0NC40Nzk2NzMzIEwzMi44MTQyNywzNS4xNTkyNTMgTDMzLjc3ODQ1MTQsMzQuMDEwMTg2MyBDMzguMjE1OTczOCwyOC43MjE3NTMgNDYuMTAwNDE4NywyOC4wMzE5NTM0IDUxLjM4ODg1MiwzMi40Njk0NzU5IFoiIGlkPSLot6/lvoQiIGZpbGw9IiMwMzc4MkEiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNNzIuMDY0NTA2MiwyNi4xMjg0NDA2IEw3My4yNjYzMDc5LDI2LjIyMjA0MTMgTDc0LjM3NzU0MTYsMjYuMzk3MDkgTDc1LjU3NjI3OTIsMjYuNjg0OTIyNCBMNzYuNDc4NTYyMywyNi45NzMxMDM2IEw3Ny41MTY0NTg5LDI3LjM4NjMzNDcgTDc3LjUxNjQ1ODksMjcuMzg2MzM0NyBMNzguMjAwNjU1MywyNy43MTA0NDczIEw3OS4zMDc1MTExLDI4LjMzMTQwODYgTDc5LjcwNDIsMjguNTg1OTgwNSBMODAuMjkxNTU3OCwyOC45OTc0NTY2IEw4MC44MDkzMjg3LDI5LjM5NzU4MjggTDgxLjIxODA3NjgsMjkuNzQwODE0MyBMODEuNzcyNzI0MywzMC4yNDk2ODA3IEw4Mi4yMTE2Mzk2LDMwLjY5MTk2MzIgTDgyLjIxMTYzOTYsMzAuNjkxOTYzMiBMODIuNjM0NzgxOCwzMS4xNTYxOTk0IEw4My4wOTIyMjcyLDMxLjcwNjIzMjEgTDgzLjYxOTAyNjMsMzIuNDEzNDQ1NSBMNjMuMTYzMzEwOCw0Ni43MzY2OTE3IEM2MC45ODg3ODEsNDguMjU5MzEzOSA1OC41MTE3ODE3LDQ5LjExMzY3NjggNTYuMDAwNjA2Myw0OS4zMTMzMzE2IEw1NC43NDM0MTI4LDQ5LjM1ODY2MjggQzUxLjM4OTkyNjQsNDkuMzM0Mzg5NyA0OC4wNTUxNzcxLDQ4LjE1MDIwNjEgNDUuMzc1MTE5NSw0NS44MzgyMzM0IEw0Mi4zNzc0OTk1LDQzLjI1MjMxMyBMNjMuMDcwNjgxNiwyOC43ODMyMDI2IEM2My42NzAxMjExLDI4LjM2NDA2MTggNjQuMjg5ODcxMywyNy45OTU2NDMzIDY0LjkyNDgzNTYsMjcuNjc3MDQ2OCBMNjUuOTUxNDUxMywyNy4yMTAyOTkxIEw2NS45NTE0NTEzLDI3LjIxMDI5OTEgTDY2LjU3MDYwOTYsMjYuOTczMjE1NyBMNjcuNzY3NzYyNywyNi42MDI1NDE2IEw2Ny43Njc3NjI3LDI2LjYwMjU0MTYgTDY4Ljk4MjU5NjQsMjYuMzM3MjA5MiBMNjkuNzk2ODcyMSwyNi4yMTg1ODE3IEw3MC4yMTY0MDg1LDI2LjE3NTQ3ODUgQzcwLjgzMjMzODgsMjYuMTIxMDkyMyA3MS40NDk2MzQ3LDI2LjEwNTYzNjEgNzIuMDY0NTA2MiwyNi4xMjg0NDA2IFoiIGlkPSLot6/lvoQiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+',
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
  },
  columnExpandable: { icon: ['plus', 'minus'] },
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
  trigger: 'hover',
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
  list,
  collapse,
  image,
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
