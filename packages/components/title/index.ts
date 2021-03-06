import { installComponent } from '@idux/components/core/utils'
import IxTitle from './src/Title.vue'

IxTitle.install = installComponent(IxTitle)

export { IxTitle }
export * from './src/types'
