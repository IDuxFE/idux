/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const portalTargetDef = IxPropTypes.oneOfType([
  String,
  HTMLElement,
  IxPropTypes.func<() => string | HTMLElement>(),
])

export const portalProps = {
  disabled: IxPropTypes.bool,
  target: IxPropTypes.oneOfType([String, HTMLElement, IxPropTypes.func<() => string | HTMLElement>()]).isRequired,
  load: IxPropTypes.bool.def(true),
}

export type PortalProps = IxInnerPropTypes<typeof portalProps>
export type PortalPublicProps = IxPublicPropTypes<typeof portalProps>
export type PortalComponent = DefineComponent<PortalPublicProps>
export type PortalInstance = InstanceType<DefineComponent<PortalProps>>

export type PortalTargetType = string | HTMLElement | (() => string | HTMLElement)
