import { installComponent } from '@idux/components/utils'
import IxAffix from './src/Affix.vue'

IxAffix.install = installComponent(IxAffix)

export { IxAffix }

export type { AffixComponent, AffixProps, AffixOffset, AffixDirection } from './src/types'
