/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type TabsType = 'card' | 'line' | 'segment'
export type TabsPlacement = 'top' | 'start'
export type TabsMode = 'default' | 'primary'

export const tabsProps = {
  selectedKey: IxPropTypes.oneOfType([String, Number]),
  type: IxPropTypes.oneOf<TabsType>(['card', 'line', 'segment']).def('card'),
  forceRender: IxPropTypes.bool.def(false),
  placement: IxPropTypes.oneOf<TabsPlacement>(['top', 'start']).def('top'),
  mode: IxPropTypes.oneOf<TabsMode>(['default', 'primary']).def('default'),

  'onUpdate:selectedKey': IxPropTypes.emit<(selectedKey: string | number) => void>(),
  onTabClick: IxPropTypes.emit<(key: string | number, evt: Event) => void>(),
  onPreClick: IxPropTypes.emit<(evt: Event) => void>(),
  onNextClick: IxPropTypes.emit<(evt: Event) => void>(),
}

export const tabProps = {
  title: IxPropTypes.string,
  forceRender: IxPropTypes.bool,
  disabled: IxPropTypes.bool.def(false),
}

export type TabsProps = IxInnerPropTypes<typeof tabsProps>
export type TabsPublicProps = IxPublicPropTypes<typeof tabsProps>
export type TabsComponent = DefineComponent<Omit<HTMLAttributes, keyof TabsPublicProps> & TabsPublicProps>
export type TabsInstance = InstanceType<DefineComponent<TabsProps>>

export type TabProps = IxInnerPropTypes<typeof tabProps>
export type TabPublicProps = IxPublicPropTypes<typeof tabProps>
export type TabComponent = DefineComponent<Omit<HTMLAttributes, keyof TabPublicProps> & TabPublicProps>
export type TabInstance = InstanceType<DefineComponent<TabProps>>

// private

export const tabNavProps = {
  title: IxPropTypes.string,
  disabled: IxPropTypes.bool,
}
