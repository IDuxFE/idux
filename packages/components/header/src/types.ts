/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { AvatarProps } from '@idux/components/avatar'
import type { DefineComponent, HTMLAttributes, PropType, VNode } from 'vue'

export type HeaderSize = 'xl' | 'lg' | 'md' | 'sm'

export const headerProps = {
  avatar: { type: [String, Object] as PropType<string | AvatarProps>, default: undefined },
  description: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  prefix: { type: [String, Object] as PropType<string | VNode>, default: undefined },
  size: { type: String as PropType<HeaderSize>, default: 'md' },
  showBar: { type: Boolean, default: false },
  subTitle: { type: String, default: undefined },
  suffix: { type: [String, Object] as PropType<string | VNode>, default: undefined },
  title: { type: String, default: undefined },

  // events
  onPrefixClick: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onSuffixClick: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
}

export type HeaderProps = ExtractInnerPropTypes<typeof headerProps>
export type HeaderPublicProps = ExtractPublicPropTypes<typeof headerProps>
export type HeaderComponent = DefineComponent<Omit<HTMLAttributes, keyof HeaderPublicProps> & HeaderPublicProps>
export type HeaderInstance = InstanceType<DefineComponent<HeaderProps>>
