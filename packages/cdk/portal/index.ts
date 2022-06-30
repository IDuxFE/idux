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
export { convertTarget as convertPortalTarget } from './src/convertTarget'

export type { PortalInstance, PortalComponent, PortalPublicProps as PortalProps, PortalTargetType } from './src/types'
