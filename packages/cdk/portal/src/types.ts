import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const portalProps = {
  disabled: IxPropTypes.bool,
  target: IxPropTypes.oneOfType([String, HTMLElement]).isRequired,
}

export type PortalProps = IxExtractPropTypes<typeof portalProps>

export type PortalInstance = InstanceType<DefineComponent<PortalProps>>
