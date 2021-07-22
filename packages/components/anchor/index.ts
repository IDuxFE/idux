import type { AnchorComponent, AnchorLinkComponent } from './src/types'

import Anchor from './src/Anchor'
import AnchorLink from './src/AnchorLink'

const IxAnchor = Anchor as unknown as AnchorComponent
const IxAnchorLink = AnchorLink as unknown as AnchorLinkComponent

export { IxAnchor, IxAnchorLink }

export type {
  AnchorInstance,
  AnchorPublicProps as AnchorProps,
  AnchorLinkInstance,
  AnchorLinkPublicProps as AnchorLinkProps,
} from './src/types'
