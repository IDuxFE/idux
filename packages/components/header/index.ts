/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { HeaderComponent } from './src/types'

import Header from './src/Header'

const IxHeader = Header as unknown as HeaderComponent

export { IxHeader }

export { getThemeTokens as getHeaderThemeTokens } from './theme'

export type { HeaderInstance, HeaderComponent, HeaderPublicProps as HeaderProps } from './src/types'

export type { HeaderThemeTokens } from './theme'
