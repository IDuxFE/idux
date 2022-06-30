/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, PropType } from 'vue'

export const portalProps = {
  disabled: { type: Boolean, default: undefined },
  target: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    required: true,
  },
  load: { type: Boolean, default: true },
}

export type PortalProps = ExtractInnerPropTypes<typeof portalProps>
export type PortalPublicProps = ExtractPublicPropTypes<typeof portalProps>
export type PortalComponent = DefineComponent<PortalPublicProps>
export type PortalInstance = InstanceType<DefineComponent<PortalProps>>

export type PortalTargetType = string | HTMLElement | (() => string | HTMLElement)
