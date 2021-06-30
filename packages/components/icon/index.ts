import { IconComponent } from './src/types'
import Icon from './src/Icon'
import { addIconDefinitions, fetchFromIconfont } from './src/helper'
import { staticIcons } from './src/staticIcons'

addIconDefinitions(staticIcons)

const IxIcon = Icon as unknown as IconComponent

export { IxIcon, addIconDefinitions, fetchFromIconfont }
export * from './src/definitions'

export type { IconInstance, IconPublicProps as IconProps, IconDefinition } from './src/types'
