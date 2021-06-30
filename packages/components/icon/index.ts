import IxIcon from './src/Icon'
import { addIconDefinitions, fetchFromIconfont } from './src/helper'
import { staticIcons } from './src/staticIcons'

addIconDefinitions(staticIcons)

export { IxIcon, addIconDefinitions, fetchFromIconfont }

export type { IconInstance, IconProps, IconDefinition } from './src/types'

export * from './src/definitions'
