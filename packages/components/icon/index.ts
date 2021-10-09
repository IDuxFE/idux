/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import Icon from './src/Icon'
import { addIconDefinitions, fetchFromIconfont } from './src/helper'
import { staticIcons } from './src/staticIcons'
import { IconComponent } from './src/types'

addIconDefinitions(staticIcons)

const IxIcon = Icon as unknown as IconComponent

export { IxIcon, addIconDefinitions, fetchFromIconfont }
export * from './src/definitions'

export type { IconInstance, IconPublicProps as IconProps, IconDefinition } from './src/types'
