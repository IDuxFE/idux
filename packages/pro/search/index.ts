/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProSearchComponent, ProSearchShortcutComponent } from './src/types'

import ProSearch from './src/ProSearch'
import ProSearchShortcut from './src/components/quickSelect/QuickSelectShortcut'

const IxProSearch = ProSearch as unknown as ProSearchComponent
const IxProSearchShortcut = ProSearchShortcut as unknown as ProSearchShortcutComponent

export { IxProSearch, IxProSearchShortcut }

export type {
  ProSearchInstance,
  ProSearchComponent,
  ProSearchPublicProps as ProSearchProps,
  ProSearchShortcutInstance,
  ProSearchShortcutComponent,
  ProSearchShortcutPublicProps as ProSearchShortcutProps,
  SearchField,
  SearchValue,
  SearchItemError,
  SearchItemCreateContext,
  SearchItemConfirmContext,
} from './src/types'
