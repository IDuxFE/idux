/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchComponent } from './src/types'

import ProSearch from './src/ProSearch'

const IxProSearch = ProSearch as unknown as ProSearchComponent

export { IxProSearch }

export type {
  ProSearchInstance,
  ProSearchComponent,
  ProSearchPublicProps as ProSearchProps,
  SearchField,
  SearchValue,
  InvalidSearchValue,
} from './src/types'
