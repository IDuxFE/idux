/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { EmptyComponent } from './src/types'

import Empty from './src/Empty'

const IxEmpty = Empty as unknown as EmptyComponent

export { IxEmpty }

export type { EmptyInstance, EmptyComponent, EmptyPublicProps as EmptyProps } from './src/types'

export { getThemeTokens as getEmptyThemeTokens } from './theme'
export type { EmptyThemeTokens } from './theme'
