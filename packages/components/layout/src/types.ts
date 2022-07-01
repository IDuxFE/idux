/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const layoutProps = {}

export type LayoutProps = ExtractInnerPropTypes<typeof layoutProps>
export type LayoutPublicProps = ExtractPublicPropTypes<typeof layoutProps>
export type LayoutComponent = DefineComponent<Omit<HTMLAttributes, keyof LayoutPublicProps> & LayoutPublicProps>
export type LayoutInstance = InstanceType<DefineComponent<LayoutProps>>

export const layoutHeaderProps = {}

export type LayoutHeaderProps = ExtractInnerPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderPublicProps = ExtractPublicPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutHeaderPublicProps> & LayoutHeaderPublicProps
>
export type LayoutHeaderInstance = InstanceType<DefineComponent<LayoutHeaderProps>>

export const layoutContentProps = {}

export type LayoutContentProps = ExtractInnerPropTypes<typeof layoutContentProps>
export type LayoutContentPublicProps = ExtractPublicPropTypes<typeof layoutContentProps>
export type LayoutContentComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutContentPublicProps> & LayoutContentPublicProps
>
export type LayoutContentInstance = InstanceType<DefineComponent<LayoutContentProps>>

export const layoutFooterProps = {}

export type LayoutFooterProps = ExtractInnerPropTypes<typeof layoutFooterProps>
export type LayoutFooterPublicProps = ExtractPublicPropTypes<typeof layoutFooterProps>
export type LayoutFooterComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutFooterPublicProps> & LayoutFooterPublicProps
>
export type LayoutFooterInstance = InstanceType<DefineComponent<LayoutFooterProps>>

export const layoutSiderProps = {
  collapsed: {
    type: Boolean,
    default: undefined,
  },
  breakpoint: String as PropType<BreakpointKey>,

  // events
  'onUpdate:collapsed': [Function, Array] as PropType<MaybeArray<(collapsed: boolean) => void>>,
}

export type LayoutSiderProps = ExtractInnerPropTypes<typeof layoutSiderProps>
export type LayoutSiderPublicProps = ExtractPublicPropTypes<typeof layoutSiderProps>
export type LayoutSiderComponent = DefineComponent<
  Omit<HTMLAttributes, keyof LayoutSiderPublicProps> & LayoutSiderPublicProps
>
export type LayoutSiderInstance = InstanceType<DefineComponent<LayoutSiderProps>>
