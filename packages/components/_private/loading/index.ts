/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LoadingComponent } from './src/types'

import Loading from './src/Loading'

const ɵLoading = Loading as unknown as LoadingComponent

export { ɵLoading }

export type { LoadingInstance, LoadingComponent, LoadingPublicProps as LoadingProps } from './src/types'
export { loadingProps } from './src/types'
