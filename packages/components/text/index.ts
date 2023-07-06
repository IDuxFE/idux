/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextComponent } from './src/types'

import Text from './src/Text'

const IxText = Text as unknown as TextComponent

export { IxText }

export type { TextInstance, TextComponent, TextPublicProps as TextProps } from './src/types'
