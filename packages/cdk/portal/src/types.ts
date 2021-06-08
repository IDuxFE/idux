import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const portalProps = {
  disabled: IxPropTypes.bool,
  target: IxPropTypes.oneOfType([String, HTMLElement]).isRequired,
  show: IxPropTypes.bool.def(true),
}

export type PortalProps = IxExtractPropTypes<typeof portalProps>

export type PortalInstance = InstanceType<DefineComponent<PortalProps>>
