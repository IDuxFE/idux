/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const rateProps = {
  value: IxPropTypes.oneOfType([Number, String]),
  allowHalf: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  count: IxPropTypes.oneOfType([Number, String]),
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.string,
  tooltips: IxPropTypes.arrayOf(String).def(() => []),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: number) => void>(),
  onChange: IxPropTypes.emit<(value: number) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onKeyDown: IxPropTypes.emit<(evt: KeyboardEvent) => void>(),
}

export type RateProps = ExtractInnerPropTypes<typeof rateProps>
export type RatePublicProps = ExtractPublicPropTypes<typeof rateProps>
export interface RateBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}
export type RateComponent = DefineComponent<Omit<HTMLAttributes, keyof RatePublicProps> & RatePublicProps, RateBindings>
export type RateInstance = InstanceType<DefineComponent<RateProps, RateBindings>>

// private
export const rateItemProps = {
  count: IxPropTypes.number.isRequired,
  disabled: IxPropTypes.bool.isRequired,
  focused: IxPropTypes.bool.isRequired,
  index: IxPropTypes.number.isRequired,
  prefixCls: IxPropTypes.string.isRequired,
  tooltip: IxPropTypes.string,
  value: IxPropTypes.number.isRequired,

  // events
  onClick: IxPropTypes.func<(evt: MouseEvent, element: HTMLElement, index: number) => void>().isRequired,
  onMouseMove: IxPropTypes.func<(evt: MouseEvent, element: HTMLElement, index: number) => void>().isRequired,
}
