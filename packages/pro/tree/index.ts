/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTreeComponent } from './src/types'

import ProTree from './src/ProTree'

const IxProTree = ProTree as unknown as ProTreeComponent

export { IxProTree }

export type { ProTreeInstance, ProTreeComponent, ProTreePublicProps as ProTreeProps } from './src/types'

export { getThemeTokens as getProTreeThemeTokens } from './theme'

export type { ProTreeThemeTokens } from './theme'
