import type { SpaceComponent } from './src/types'

import Space from './src/Space'

const IxSpace = Space as unknown as SpaceComponent

export { IxSpace }

export type { SpaceInstance, SpacePublicProps as SpaceProps, SpaceAlign, SpaceDirection, SpaceSize } from './src/types'
