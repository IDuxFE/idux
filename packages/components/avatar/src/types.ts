/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = number | 'lg' | 'md' | 'sm'

export const avatarProps = {
  alt: String,
  gap: Number,
  icon: [String, Object] as PropType<string | VNode>,
  shape: String as PropType<AvatarShape>,
  size: [Number, String, Object] as PropType<number | AvatarSize | Record<BreakpointKey, number>>,
  src: String,
  srcset: String,
  text: String,

  // events
  onError: [Function, Array] as PropType<MaybeArray<(evt: Event) => boolean | void>>,
} as const

export type AvatarProps = ExtractInnerPropTypes<typeof avatarProps>
export type AvatarPublicProps = ExtractPublicPropTypes<typeof avatarProps>
export type AvatarComponent = DefineComponent<Omit<HTMLAttributes, keyof AvatarPublicProps> & AvatarPublicProps>
export type AvatarInstance = InstanceType<DefineComponent<AvatarProps>>
