/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResultComponent } from './src/types'

import Result from './src/Result'

const IxResult = Result as unknown as ResultComponent

export { IxResult }

export type { ResultInstance, ResultComponent, ResultPublicProps as ResultProps, ResultStatus } from './src/types'

export { getThemeTokens as getResultThemeTokens } from './theme'

export type { ResultThemeTokens } from './theme'
