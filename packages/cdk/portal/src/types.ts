import type { DefineComponent } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const portalTargetDef = IxPropTypes.oneOfType([String, HTMLElement])

export const portalProps = {
  disabled: IxPropTypes.bool,
  target: IxPropTypes.oneOfType([String, HTMLElement]).isRequired,
  load: IxPropTypes.bool.def(true),
}

export type PortalProps = IxInnerPropTypes<typeof portalProps>
export type PortalPublicProps = IxPublicPropTypes<typeof portalProps>
export type PortalComponent = DefineComponent<PortalPublicProps>
export type PortalInstance = InstanceType<DefineComponent<PortalProps>>
