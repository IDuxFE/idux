/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LayoutProComponent } from './src/types'

import LayoutPro from './src/Layout'

const IxLayoutPro = LayoutPro as unknown as LayoutProComponent

export { IxLayoutPro }

export type {
  LayoutProInstance,
  LayoutProComponent,
  LayoutProPublicProps as LayoutProProps,
  LayoutProThemes,
  LayoutProModeTypes,
  LayoutProMenuData,
  LayoutProMenuPath,
} from './src/types'
