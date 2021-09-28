import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const backTopProps = {
  target: IxPropTypes.oneOfType([String, HTMLElement]),
  duration: IxPropTypes.number,
  visibilityHeight: IxPropTypes.number,
}

export type BackTopProps = IxInnerPropTypes<typeof backTopProps>
export type BackTopPublicProps = IxPublicPropTypes<typeof backTopProps>
export type BackTopComponent = DefineComponent<Omit<HTMLAttributes, keyof BackTopPublicProps> & BackTopPublicProps>
export type BackTopInstance = InstanceType<DefineComponent<BackTopProps>>
