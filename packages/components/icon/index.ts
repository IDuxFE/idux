import { installComponent } from '@idux/components/core/utils'
import IxIcon from './src/Icon.vue'
import { addIconDefinitions, fetchFromIconfont } from './src/helper'
import { staticIcons } from './src/staticIcons'

addIconDefinitions(staticIcons)

IxIcon.install = installComponent(IxIcon)

export { IxIcon, addIconDefinitions, fetchFromIconfont }

export type { IconComponent, IconProps, IconDefinition } from './src/types'

export * from './src/definitions'
