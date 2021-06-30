import type { SelectComponent, OptionComponent, OptionGroupComponent } from './src/types'

import Select from './src/Select.vue'
import Option from './src/Option.vue'
import OptionGroup from './src/OptionGroup.vue'

const IxSelect = Select as unknown as SelectComponent
const IxOption = Option as unknown as OptionComponent
const IxOptionGroup = OptionGroup as unknown as OptionGroupComponent

export { IxSelect, IxOption, IxOptionGroup }

export type {
  SelectInstance,
  SelectPublicProps as SelectProps,
  OptionInstance,
  OptionPublicProps as OptionProps,
  OptionGroupInstance,
  OptionGroupPublicProps as OptionGroupProps,
  SelectOption,
  SelectFilterFn,
} from './src/types'
