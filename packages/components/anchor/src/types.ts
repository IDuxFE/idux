/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const anchorProps = {
  affix: {
    type: Boolean,
    default: true,
  },
  bounds: Number,
  hideLinkBall: {
    type: Boolean,
    default: undefined,
  },
  offsetTop: Number,
  target: [String, HTMLElement, Function] as PropType<string | HTMLElement | (() => string | HTMLElement)>,
  targetOffset: Number,

  // events
  onChange: [Function, Array] as PropType<MaybeArray<(activeLink: string) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent, link: AnchorLinkProps) => void>>,
} as const

export type AnchorProps = ExtractInnerPropTypes<typeof anchorProps>
export type AnchorPublicProps = ExtractPublicPropTypes<typeof anchorProps>
export type AnchorComponent = DefineComponent<Omit<HTMLAttributes, keyof AnchorPublicProps> & AnchorPublicProps>
export type AnchorInstance = InstanceType<DefineComponent<AnchorProps>>

export const linkProps = {
  href: {
    type: String,
    required: true,
  },
  title: String,
} as const

export type AnchorLinkProps = ExtractInnerPropTypes<typeof linkProps>
export type AnchorLinkPublicProps = ExtractPublicPropTypes<typeof linkProps>
export type AnchorLinkComponent = DefineComponent<
  Omit<HTMLAttributes, keyof AnchorLinkPublicProps> & AnchorLinkPublicProps
>
export type AnchorLinkInstance = InstanceType<DefineComponent<AnchorLinkProps>>
