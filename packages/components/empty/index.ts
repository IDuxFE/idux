/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { EmptyComponent } from './src/types'

import Empty from './src/Empty.vue'

const IxEmpty = Empty as unknown as EmptyComponent

export { IxEmpty }

export type { EmptyInstance, EmptyPublicProps as EmptyProps } from './src/types'
