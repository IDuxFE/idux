/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const backTopProps = {
  target: IxPropTypes.oneOfType([String, HTMLElement, IxPropTypes.func<() => string | HTMLElement>()]),
  duration: IxPropTypes.number,
  visibilityHeight: IxPropTypes.number,

  onClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}

export type BackTopProps = IxInnerPropTypes<typeof backTopProps>
export type BackTopPublicProps = IxPublicPropTypes<typeof backTopProps>
export type BackTopComponent = DefineComponent<Omit<HTMLAttributes, keyof BackTopPublicProps> & BackTopPublicProps>
export type BackTopInstance = InstanceType<DefineComponent<BackTopProps>>
