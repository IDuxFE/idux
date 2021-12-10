/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AnchorComponent, AnchorLinkComponent } from './src/types'

import Anchor from './src/Anchor'
import AnchorLink from './src/AnchorLink'

const IxAnchor = Anchor as unknown as AnchorComponent
const IxAnchorLink = AnchorLink as unknown as AnchorLinkComponent

export { IxAnchor, IxAnchorLink }

export type {
  AnchorInstance,
  AnchorComponent,
  AnchorPublicProps as AnchorProps,
  AnchorLinkInstance,
  AnchorLinkComponent,
  AnchorLinkPublicProps as AnchorLinkProps,
} from './src/types'
