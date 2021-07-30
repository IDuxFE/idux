import type { PortalComponent } from './src/types'

import Portal from './src/Portal'

const IxPortal = Portal as unknown as PortalComponent

export { IxPortal }
export { useContainer } from './src/useContainer'
export { portalTargetDef } from './src/types'

export type { PortalInstance, PortalPublicProps as PortalProps } from './src/types'
