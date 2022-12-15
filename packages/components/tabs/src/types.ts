/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type TabsType = 'card' | 'line' | 'segment'
export type TabsPlacement = 'top' | 'bottom' | 'start' | 'end'
export type TabsMode = 'default' | 'primary'
export type TabsSize = 'lg' | 'md'

export const tabsProps = {
  selectedKey: { type: [Number, String, Symbol] as PropType<VKey>, default: undefined },
  type: { type: String as PropType<TabsType>, default: 'card' },
  forceRender: { type: Boolean, default: false },
  placement: { type: String as PropType<TabsPlacement>, default: 'top' },
  mode: { type: String as PropType<TabsMode>, default: 'default' },
  size: String as PropType<TabsSize>,

  'onUpdate:selectedKey': [Function, Array] as PropType<MaybeArray<(key: any) => void>>,
  onTabClick: [Function, Array] as PropType<MaybeArray<(key: any, evt: Event) => void>>,
  onPreClick: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onNextClick: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onBeforeLeave: [Function, Array] as PropType<MaybeArray<(key: any, oldKey?: any) => boolean | Promise<boolean>>>,
} as const

export const tabProps = {
  title: { type: String, default: undefined },
  forceRender: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: false },
} as const

export type TabsProps = ExtractInnerPropTypes<typeof tabsProps>
export type TabsPublicProps = ExtractPublicPropTypes<typeof tabsProps>
export type TabsComponent = DefineComponent<Omit<HTMLAttributes, keyof TabsPublicProps> & TabsPublicProps>
export type TabsInstance = InstanceType<DefineComponent<TabsProps>>

export type TabProps = ExtractInnerPropTypes<typeof tabProps>
export type TabPublicProps = ExtractPublicPropTypes<typeof tabProps>
export type TabComponent = DefineComponent<Omit<HTMLAttributes, keyof TabPublicProps> & TabPublicProps>
export type TabInstance = InstanceType<DefineComponent<TabProps>>

// private

export const tabNavProps = {
  defaultSelectedKey: { type: [Number, String, Symbol] as PropType<VKey>, default: undefined },
  title: { type: String, default: undefined },
  disabled: { type: Boolean, default: undefined },
} as const
