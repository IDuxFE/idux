/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { AvatarProps } from '@idux/components/avatar'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type HeaderSize = 'xl' | 'lg' | 'md' | 'sm'

export const headerProps = {
  avatar: IxPropTypes.oneOfType([String, IxPropTypes.object<AvatarProps>()]),
  description: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  prefix: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  size: IxPropTypes.oneOf<HeaderSize>(['xl', 'lg', 'md', 'sm']).def('md'),
  showBar: IxPropTypes.bool.def(false),
  subTitle: IxPropTypes.string,
  suffix: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  title: IxPropTypes.string,

  // events
  onPrefixClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
  onSuffixClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}

export type HeaderProps = IxInnerPropTypes<typeof headerProps>
export type HeaderPublicProps = IxPublicPropTypes<typeof headerProps>
export type HeaderComponent = DefineComponent<Omit<HTMLAttributes, keyof HeaderPublicProps> & HeaderPublicProps>
export type HeaderInstance = InstanceType<DefineComponent<HeaderProps>>
