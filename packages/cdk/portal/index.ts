/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalComponent } from './src/types'

import Portal from './src/Portal'

const CdkPortal = Portal as unknown as PortalComponent

export { CdkPortal }
export { useTarget } from './src/useTarget'
export { portalTargetDef as ɵPortalTargetDef } from './src/types'

export type { PortalInstance, PortalPublicProps as PortalProps, PortalTargetType } from './src/types'
