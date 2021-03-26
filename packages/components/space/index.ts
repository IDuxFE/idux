import { installComponent } from '@idux/components/utils'
import IxSpace from './src/Space.vue'

IxSpace.install = installComponent(IxSpace)

export { IxSpace }

export type { SpaceComponent, SpaceProps, SpaceAlign, SpaceDirection } from './src/types'

export type { SpaceSize } from '@idux/components/config'
