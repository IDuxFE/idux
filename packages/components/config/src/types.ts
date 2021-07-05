import type { OverlayPlacement, OverlayTrigger } from '@idux/cdk/overlay'
import type { ButtonSize } from '@idux/components/button'
import type { CardSize } from '@idux/components/card'
import type { DividerPosition, DividerType } from '@idux/components/divider'
import type { FormLabelAlign, FormLayout, FormSize } from '@idux/components/form'
import type { TextareaResize, TextareaAutoRows } from '@idux/components/input'
import type { ListSize } from '@idux/components/list'
import type { MenuTheme } from '@idux/components/menu'
import type { PaginationItemRenderFn, PaginationSize, PaginationTotalRenderFn } from '@idux/components/pagination'
import type { ProgressSize, ProgressFormat } from '@idux/components/progress'
import type { RadioMode } from '@idux/components/radio'
import type { ResultStatus } from '@idux/components/result'
import type { SpaceSize } from '@idux/components/space'
import type { SpinTipAlignType, SpinSize } from '@idux/components/spin'
import type { StepsSize } from '@idux/components/steps'

// General

export interface ButtonConfig {
  size: ButtonSize
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}

export interface TagConfig {
  closable: boolean
  checkAble: boolean
  isRound: boolean
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
  placement: OverlayPlacement
  trigger: OverlayTrigger
}

export interface MenuConfig {
  indent: number
  theme: MenuTheme
}

export interface SubMenuConfig {
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

export interface FormConfig {
  colonless: boolean
  labelAlign: FormLabelAlign
  layout: FormLayout
  size: FormSize
}

export interface InputConfig {
  size: FormSize
  clearable: boolean
  borderless: boolean
}

export interface TextareaConfig {
  resize: TextareaResize
  autoRows: boolean | TextareaAutoRows
  showCount: boolean
  maxCount?: number | string
  computeCount?: (value: string) => string
  size: FormSize
  clearable: boolean
}

export interface RadioGroupConfig {
  size: FormSize
  mode: RadioMode
}

export interface RateConfig {
  count: number
  icon: string
  allowHalf: boolean
  allowClear: boolean
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

// Data Display
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

export interface TooltipConfig {
  placement: OverlayPlacement
  trigger: OverlayTrigger
  showDelay: number
  hideDelay: number
  destroyOnHide: boolean
  autoAdjust: boolean
}

export interface PopoverConfig {
  placement: OverlayPlacement
  trigger: OverlayTrigger
  showDelay: number
  hideDelay: number
  destroyOnHide: boolean
  autoAdjust: boolean
}

// Feedback
export interface MessageConfig {
  duration: number
  maxCount: number
  top: number
  destroyOnHover: boolean
}

export interface ModalConfig {
  centered: boolean
  closable: boolean
  closeIcon: string
  closeOnEsc: boolean
  mask: boolean
  maskClosable: boolean
  width: string | number
  zIndex?: number
}

export interface ResultConfig {
  status: ResultStatus
}

export interface SpinConfig {
  icon: string
  tip: string
  tipAlign: SpinTipAlignType
  size: SpinSize
}

export interface DrawerConfig {
  closable: boolean
  mask: boolean
  maskClosable: boolean
  wrapClassName: string
  keyboard: boolean
}

export interface ProgressConfig {
  size: ProgressSize
  format: ProgressFormat
}

// Steps

export interface StepsConfig {
  size: StepsSize
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
  subMenu: SubMenuConfig
  pagination: PaginationConfig
  // Data Entry
  form: FormConfig
  input: InputConfig
  textarea: TextareaConfig
  radioGroup: RadioGroupConfig
  rate: RateConfig
  select: SelectConfig
  // Data Display
  badge: BadgeConfig
  card: CardConfig
  list: ListConfig
  collapse: CollapseConfig
  image: ImageConfig
  statistic: StatisticConfig
  tooltip: TooltipConfig
  popover: PopoverConfig
  steps: StepsConfig
  // Feedback
  message: MessageConfig
  modal: ModalConfig
  result: ResultConfig
  spin: SpinConfig
  drawer: DrawerConfig
  progress: ProgressConfig
  // Other
  backTop: BackTopConfig
  anchor: AnchorConfig
  // --- end ---
}

export type GlobalConfigKey = keyof GlobalConfig
