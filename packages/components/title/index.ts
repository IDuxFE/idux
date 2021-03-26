import { installComponent } from '@idux/components/utils'
import IxTitle from './src/Title.vue'

IxTitle.install = installComponent(IxTitle)

export { IxTitle }

export type { TitleComponent, TitleProps } from './src/types'
