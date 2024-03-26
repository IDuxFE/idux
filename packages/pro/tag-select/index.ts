/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTagSelectComponent } from './src/types'

import ProTagSelect from './src/ProTagSelect'

const IxProTagSelect = ProTagSelect as unknown as ProTagSelectComponent

export { IxProTagSelect }

export type {
  ProTagSelectInstance,
  ProTagSelectComponent,
  ProTagSelectPublicProps as ProTagSelectProps,
  ProTagSelectSlots,
  TagSelectColor,
  TagSelectData,
} from './src/types'

export { getThemeTokens as getProTagSelectThemeTokens } from './theme'

export type { ProTagSelectThemeTokens } from './theme'
