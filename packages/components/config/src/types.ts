/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { AvatarShape, AvatarSize } from '@idux/components/avatar'
import type { ButtonSize } from '@idux/components/button'
import type { CardSize } from '@idux/components/card'
import type { DividerPosition, DividerType } from '@idux/components/divider'
import type { FormLabelAlign, FormLayout, FormSize } from '@idux/components/form'
import type { ListSize } from '@idux/components/list'
import type { MenuTheme } from '@idux/components/menu'
import type { MessageType } from '@idux/components/message'
import type { ModalType } from '@idux/components/modal'
import type { PaginationItemRenderFn, PaginationSize, PaginationTotalRenderFn } from '@idux/components/pagination'
import type { ProgressFormat, ProgressSize } from '@idux/components/progress'
import type { ResultStatus } from '@idux/components/result'
import type { SpaceSize } from '@idux/components/space'
import type { SpinSize, SpinTipAlignType } from '@idux/components/spin'
import type { StepperSize } from '@idux/components/stepper'
import type { TableColumnAlign, TableColumnSortOrder, TablePaginationPosition, TableSize } from '@idux/components/table'
import type { TagShape } from '@idux/components/tag'
import type { TextareaAutoRows, TextareaResize } from '@idux/components/textarea'
import type { VNode } from 'vue'

// Common
export interface CommonConfig {
  prefixCls: string
}

// General

export interface ButtonConfig {
  size: ButtonSize
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}

export interface TagConfig {
  shape?: TagShape
}

// Layout

export interface DividerConfig {
  dashed: boolean
  plain: boolean
  position: DividerPosition
  type: DividerType
}

export interface SpaceConfig {
  size: SpaceSize
  wrap: boolean
}

export interface RowConfig {
  wrap: boolean
}

// Navigation
export interface DropdownConfig {
  autoAdjust: boolean
  destroyOnHide: boolean
  offset: [number, number]
  placement: PopperPlacement
  showArrow: boolean
  target: string | HTMLElement
  trigger: PopperTrigger
}

export interface MenuConfig {
  collapsedWidth: string | number
  indent: number
  theme: MenuTheme
}

export interface MenuSubConfig {
  offset: [number, number]
  suffix: string
  suffixRotates: [number, number]
}

export interface PaginationConfig {
  itemRender?: PaginationItemRenderFn
  lessJumper: boolean
  pageSize: number
  pageSizes: number[]
  showQuickJumper: boolean
  showSizeChanger: boolean
  showTitle: boolean
  showTotal: boolean
  simple: boolean
  size: PaginationSize
  totalRender?: PaginationTotalRenderFn
}

// Data Entry
export interface CheckboxConfig {
  size: FormSize
}

export interface FormConfig {
  colonless: boolean
  labelAlign: FormLabelAlign
  layout: FormLayout
  size: FormSize
}

export interface InputConfig {
  borderless: boolean
  clearable: boolean
  clearIcon: string
  size: FormSize
}

export interface TextareaConfig {
  autoRows: boolean | TextareaAutoRows
  clearable: boolean
  clearIcon: string
  computeCount?: (value: string) => string
  maxCount?: number | string
  resize: TextareaResize
  size: FormSize
  showCount: boolean
}

export interface RadioConfig {
  size: FormSize
}

export interface RateConfig {
  allowHalf: boolean
  clearable: boolean
  count: number
  icon: string
  size: FormSize
}

export interface SelectConfig {
  borderless: boolean
  clearable: boolean
  labelKey: string
  searchable: boolean
  size: FormSize
  suffix?: string
  valueKey: string
}

export interface TimePickerConfig {
  borderless: boolean
  clearable: boolean
  clearIcon: string
  size: FormSize
  suffix: string
}

export interface TimeRangePickerConfig extends TimePickerConfig {
  separator: string
}

// Data Display
export interface AvatarConfig {
  gap: number
  icon: string | VNode
  shape: AvatarShape
  size: AvatarSize | Partial<Record<BreakpointKey, number>>
}

export interface BadgeConfig {
  showZero: boolean
  dot: boolean
  overflowCount: number | string
}

export interface CardConfig {
  size: CardSize
  borderless: boolean
  hoverable: boolean
}

export interface ListConfig {
  size: ListSize
  borderless: boolean
}

export interface CollapseConfig {
  accordion: boolean
  borderless: boolean
  expandIcon: string
  ghost: boolean
}

export interface ImageConfig {
  width: string | number
  height: string | number
  fallback: string
}

export interface NumFormatted {
  value: string

  /** 格式化后的整数部分 */
  int: string

  /** 格式化后的小数部分，带小数点 */
  decimal: string
}
export type NumFormatter = (value: string | number, precision: number) => NumFormatted
export interface StatisticConfig {
  precision: number
  formatter: NumFormatter
}

export interface TableConfig {
  borderless: boolean
  rowKey: string
  size: TableSize

  extra: { icon: string }
  pagination: { position: TablePaginationPosition } & Partial<PaginationConfig>

  columnBase: TableColumnBaseConfig
  columnExpandable: TableColumnExpandableConfig
}

export interface TableColumnBaseConfig {
  align: TableColumnAlign
  sortable: { nextTooltip: boolean; orders: TableColumnSortOrder[] }
}

export interface TableColumnExpandableConfig {
  icon: [string, string]
}

export interface TreeConfig {
  blocked: boolean
  expandIcon: string
  nodeKey: string
  showLine: boolean
}

export interface TooltipConfig {
  autoAdjust: boolean
  delay: number | [number | null, number | null]
  destroyOnHide: boolean
  placement: PopperPlacement
  target: string | HTMLElement
  trigger: PopperTrigger
}

export interface PopoverConfig {
  autoAdjust: boolean
  delay: number | [number | null, number | null]
  destroyOnHide: boolean
  placement: PopperPlacement
  target: string | HTMLElement
  trigger: PopperTrigger
}

// Feedback
export interface MessageConfig {
  destroyOnHover: boolean
  duration: number
  icon?: Partial<Record<MessageType, string | VNode>>
  maxCount: number
  top?: number | string
}

export interface ModalConfig {
  centered: boolean
  closable: boolean
  closeIcon: string
  closeOnEsc: boolean
  icon?: Partial<Record<ModalType, string | VNode>>
  mask: boolean
  maskClosable: boolean
  width: string | number
  zIndex?: number
}

export interface DrawerConfig {
  closable: boolean
  closeIcon: string
  closeOnEsc: boolean
  height: string | number
  mask: boolean
  maskClosable: boolean
  width: string | number
  zIndex?: number
}

export interface ResultConfig {
  status: ResultStatus
  icon?: Partial<Record<ResultStatus, string | VNode>>
}

export interface SpinConfig {
  icon: string
  tip: string
  tipAlign: SpinTipAlignType
  size: SpinSize
}

export interface ProgressConfig {
  size: ProgressSize
  format: ProgressFormat
}

// Stepper

export interface StepperConfig {
  size: StepperSize
}

// Other

export interface BackTopConfig {
  duration: number
  visibilityHeight: number
}
export interface AnchorConfig {
  bounds: number
  hideLinkBall: boolean
}
// --- end ---

export interface GlobalConfig {
  // Common
  common: CommonConfig
  // General
  button: ButtonConfig
  icon: IconConfig
  tag: TagConfig
  // Layout
  divider: DividerConfig
  space: SpaceConfig
  row: RowConfig
  // Navigation
  dropdown: DropdownConfig
  menu: MenuConfig
  menuSub: MenuSubConfig
  pagination: PaginationConfig
  // Data Entry
  checkbox: CheckboxConfig
  form: FormConfig
  input: InputConfig
  textarea: TextareaConfig
  radio: RadioConfig
  rate: RateConfig
  select: SelectConfig
  timePicker: TimePickerConfig
  timeRangePicker: TimeRangePickerConfig
  // Data Display
  avatar: AvatarConfig
  badge: BadgeConfig
  card: CardConfig
  list: ListConfig
  collapse: CollapseConfig
  image: ImageConfig
  statistic: StatisticConfig
  table: TableConfig
  tooltip: TooltipConfig
  tree: TreeConfig
  popover: PopoverConfig
  stepper: StepperConfig
  // Feedback
  message: MessageConfig
  modal: ModalConfig
  drawer: DrawerConfig
  result: ResultConfig
  spin: SpinConfig
  progress: ProgressConfig
  // Other
  backTop: BackTopConfig
  anchor: AnchorConfig
  // --- end ---
}

export type GlobalConfigKey = keyof GlobalConfig
