import { installComponent } from '@idux/components/core/utils'
import IxAffix from './src/Affix.vue'

IxAffix.install = installComponent(IxAffix)

export { IxAffix }
export * from './src/types'
