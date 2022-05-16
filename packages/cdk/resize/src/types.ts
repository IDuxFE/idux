/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ResizeListener } from './utils'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const resizeObserverProps = {
  disabled: { type: Boolean, default: false },
  options: { type: Object as PropType<ResizeObserverOptions>, default: undefined },
  onResize: [Function, Array] as PropType<MaybeArray<ResizeListener>>,
} as const

export type ResizeObserverProps = ExtractInnerPropTypes<typeof resizeObserverProps>
export type ResizeObserverPublicProps = ExtractPublicPropTypes<typeof resizeObserverProps>
export type ResizeObserverComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ResizeObserverPublicProps> & ResizeObserverPublicProps
>
export type ResizeObserverInstance = InstanceType<DefineComponent<ResizeObserverProps>>
