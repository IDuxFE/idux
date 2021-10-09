/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResultComponent } from './src/types'

import Result from './src/Result.vue'

const IxResult = Result as unknown as ResultComponent

export { IxResult }

export type { ResultInstance, ResultPublicProps as ResultProps, ResultStatus } from './src/types'
