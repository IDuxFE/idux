/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  ExtractInnerPropTypes,
  ExtractPublicPropTypes,
  MaybeArray,
  MaybeElement,
  MaybeElementRef,
} from '@idux/cdk/utils'
import type { Component, DefineComponent, HTMLAttributes, ObjectDirective, PropType } from 'vue'

export const clickOutsideProps = {
  disabled: { type: Boolean, default: false },
  is: { type: [String, Object] as PropType<string | Component>, default: 'div' },
  options: { type: Object as PropType<ClickOutsideOptions>, default: undefined },
  onClickOutside: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
} as const

export type ClickOutsideProps = ExtractInnerPropTypes<typeof clickOutsideProps>
export type ClickOutsidePublicProps = ExtractPublicPropTypes<typeof clickOutsideProps>
export type ClickOutsideComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ClickOutsidePublicProps> & ClickOutsidePublicProps
>
export type ClickOutsideInstance = InstanceType<DefineComponent<ClickOutsideProps>>

export type ClickOutsideDirective = ObjectDirective<MaybeElement, ClickOutsideBinding>

export interface ClickOutsideOptions {
  container?: MaybeElementRef | Window | Document
  exclude?: MaybeElementRef[]
}
export type ClickOutsideHandler = (evt: MouseEvent) => void
export type ClickOutsideBinding = ClickOutsideHandler | (ClickOutsideOptions & { handler: ClickOutsideHandler })
