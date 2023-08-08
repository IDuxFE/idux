/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, PropType } from 'vue'

export const STATUS_TYPE = ['loading', 'finish', 'error'] as const

export type StatusType = typeof STATUS_TYPE[number]

export interface LoadingBarOptions {
  mask?: boolean
}

export const loadingBarProviderProps = {
  container: {
    type: [String, HTMLElement, Function] as PropType<PortalTargetType>,
    default: undefined,
  },
  mask: {
    type: Boolean,
    default: false,
  },
}

export interface LoadingBarStatusTypeAnimation {
  duration: number
  progress: number
}
export type LoadingBarAnimation = Record<StatusType, LoadingBarStatusTypeAnimation>

export interface LoadingBarProviderRef {
  start: (options?: LoadingBarOptions) => void
  error: () => void
  finish: () => void
}
export type LoadingBarProviderProps = ExtractInnerPropTypes<typeof loadingBarProviderProps>
export type LoadingBarProviderPublicProps = ExtractPublicPropTypes<typeof loadingBarProviderProps>
export type LoadingBarProviderComponent = DefineComponent<LoadingBarProviderPublicProps, LoadingBarProviderRef>
export type LoadingBarProviderInstance = InstanceType<DefineComponent<LoadingBarProviderProps, LoadingBarProviderRef>>
