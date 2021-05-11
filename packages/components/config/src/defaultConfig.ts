import type {
  ButtonConfig,
  IconConfig,
  TagConfig,
  DividerConfig,
  SpaceConfig,
  RowConfig,
  InputConfig,
  TextareaConfig,
  RateConfig,
  BadgeConfig,
  CardConfig,
  CollapseConfig,
  ImageConfig,
  StatisticConfig,
  MessageConfig,
  ResultConfig,
  SpinConfig,
  ProgressConfig,
  BackTopConfig,
  AnchorConfig,
  GlobalConfig,
  TooltipConfig,
  PopoverConfig,
  SelectConfig,
  RadioGroupConfig,
  MenuConfig,
  SubMenuConfig,
  StepsConfig,
  DropdownConfig,
} from './types'

import { shallowReactive } from 'vue'
import { numFormatter } from './numFormatter'

// --------------------- General ---------------------
const button = shallowReactive<ButtonConfig>({ size: 'medium' })

const icon = shallowReactive<IconConfig>({})

const tag = shallowReactive<TagConfig>({
  closable: false,
  checkAble: false,
  isRound: false,
})

// --------------------- Layout ---------------------
const divider = shallowReactive<DividerConfig>({
  dashed: false,
  plain: false,
  position: 'center',
  type: 'horizontal',
})

const space = shallowReactive<SpaceConfig>({ size: 'small' })

const row = shallowReactive<RowConfig>({ wrap: true })

// --------------------- Navigation ---------------------
const dropdown = shallowReactive<DropdownConfig>({
  placement: 'bottom-start',
  trigger: 'hover',
})

const menu = shallowReactive<MenuConfig>({
  indent: 24,
  theme: 'light',
})

const subMenu = shallowReactive<SubMenuConfig>({
  suffix: 'right',
  suffixRotates: [-90, 90],
})

// --------------------- Data Entry ---------------------
const input = shallowReactive<InputConfig>({
  size: 'medium',
  clearable: false,
  borderless: false,
})

const textarea = shallowReactive<TextareaConfig>({
  resize: 'vertical',
  autoRows: false,
  showCount: false,
  size: 'medium',
  clearable: false,
})

const rate = shallowReactive<RateConfig>({
  count: 5,
  icon: 'star',
  allowHalf: false,
  allowClear: false,
})

const radioGroup: RadioGroupConfig = shallowReactive({
  size: 'medium',
  mode: 'border',
})

const select = shallowReactive<SelectConfig>({
  borderless: false,
  clearable: false,
  labelKey: 'label',
  searchable: false,
  size: 'medium',
  valueKey: 'value',
})

// --------------------- Data Display ---------------------
const badge = shallowReactive<BadgeConfig>({ showZero: false, dot: false, overflowCount: 99 })

const card = shallowReactive<CardConfig>({
  size: 'medium',
  borderless: false,
  hoverable: false,
})

const collapse: CollapseConfig = shallowReactive<CollapseConfig>({ accordion: false })

const image: ImageConfig = shallowReactive({
  width: 100,
  height: 100,
  fallback:
    'data:image/png;base64,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',
})

const statistic = shallowReactive<StatisticConfig>({
  precision: 0,
  formatter: numFormatter,
})

const tooltip = shallowReactive<TooltipConfig>({
  placement: 'top',
  trigger: 'hover',
  showDelay: 100,
  hideDelay: 100,
  destroyOnHide: false,
  autoAdjust: true,
})

const popover = shallowReactive<PopoverConfig>({
  placement: 'top',
  trigger: 'click',
  showDelay: 100,
  hideDelay: 100,
  destroyOnHide: false,
  autoAdjust: true,
})

// --------------------- Feedback ---------------------
const message = shallowReactive<MessageConfig>({
  duration: 3000,
  maxCount: 5,
  top: 60,
  destroyOnHover: false,
})

const result = shallowReactive<ResultConfig>({ status: 'info' })

const spin = shallowReactive<SpinConfig>({
  icon: 'loading',
  tip: '',
  tipAlign: 'vertical',
  size: 'small',
})

const progress = shallowReactive<ProgressConfig>({
  size: 'medium',
  format: (percent: number) => percent + '%',
})

const steps = shallowReactive<StepsConfig>({
  size: 'medium',
})

// --------------------- Other ---------------------
const backTop = shallowReactive<BackTopConfig>({
  duration: 450,
  visibilityHeight: 400,
})
const anchor = shallowReactive<AnchorConfig>({
  showInkInFixed: false,
})
// --------------------- end ---------------------

export const defaultConfig: GlobalConfig = {
  // General
  button,
  icon,
  tag,
  // Layout
  divider,
  space,
  row,
  // Navigation
  dropdown,
  menu,
  subMenu,
  // Data Entry
  input,
  textarea,
  rate,
  radioGroup,
  select,
  // Data Display
  badge,
  card,
  collapse,
  image,
  statistic,
  tooltip,
  popover,
  // Feedback
  message,
  result,
  spin,
  progress,
  steps,
  // Other
  backTop,
  anchor,
  // --- end ---
}
