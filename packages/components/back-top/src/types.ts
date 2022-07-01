/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const backTopProps = {
  target: [String, HTMLElement, Function] as PropType<string | HTMLElement | (() => string | HTMLElement)>,
  duration: Number,
  visibilityHeight: Number,

  onClick: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
}

export type BackTopProps = ExtractInnerPropTypes<typeof backTopProps>
export type BackTopPublicProps = ExtractPublicPropTypes<typeof backTopProps>
export type BackTopComponent = DefineComponent<Omit<HTMLAttributes, keyof BackTopPublicProps> & BackTopPublicProps>
export type BackTopInstance = InstanceType<DefineComponent<BackTopProps>>
