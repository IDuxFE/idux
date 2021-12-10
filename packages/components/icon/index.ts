/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconComponent } from './src/types'

import Icon from './src/Icon'

const IxIcon = Icon as unknown as IconComponent

export { IxIcon }
export { addIconDefinitions, fetchIconFormScript } from './src/helper'
export { IDUX_ICON_DEPENDENCIES } from './src/dependencies'
export * from './src/definitions'

export type { IconInstance, IconComponent, IconPublicProps as IconProps, IconDefinition } from './src/types'
