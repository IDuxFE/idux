import type { DefineComponent, HTMLAttributes } from 'vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = number | 'large' | 'medium' | 'small'

const sizeProp = IxPropTypes.oneOfType<AvatarSize | Partial<Record<BreakpointKey, number>>>([
  Number,
  IxPropTypes.oneOf(['large', 'medium', 'small'] as const),
  IxPropTypes.object<Record<BreakpointKey, number>>(),
])

export const avatarProps = {
  alt: IxPropTypes.string,
  gap: IxPropTypes.number,
  icon: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  shape: IxPropTypes.oneOf<AvatarShape>(['circle', 'square']),
  size: sizeProp,
  src: IxPropTypes.string,
  srcset: IxPropTypes.string,
  text: IxPropTypes.string,

  // events
  onError: IxPropTypes.emit<(evt: Event) => boolean | void>(),
}

export type AvatarProps = IxInnerPropTypes<typeof avatarProps>
export type AvatarPublicProps = IxPublicPropTypes<typeof avatarProps>
export type AvatarComponent = DefineComponent<Omit<HTMLAttributes, keyof AvatarPublicProps> & AvatarPublicProps>
export type AvatarInstance = InstanceType<DefineComponent<AvatarProps>>
